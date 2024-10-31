function TrainInfo() {
    this.number = null;
    this.routeName = null;
    this.from = null;
    this.to = null;
    this.speed = null;
    this.heading = null;
    this.lastUpdate = null;
    this.scheduledDeparture = null;
    this.lastVisitedStation = null;
    this.punctuality = null;
    this.state = null;
    this.toString = function() {
        return this.routeName + " Train #" + this.number +
            "\nGoing " + Math.trunc(this.speed) + " Mph Heading " + this.heading + " from " + this.from + " to " + this.to +
            "\nReported running " + this.punctuality + " by most recently visited stop " + this.lastVisitedStation + "\n";
    }
}

const MAP_HEX = {
    0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6,
    7: 7, 8: 8, 9: 9, a: 10, b: 11, c: 12, d: 13,
    e: 14, f: 15, A: 10, B: 11, C: 12, D: 13,
    E: 14, F: 15
};
function fromHex(hexString) {
    const bytes = new Uint8Array(Math.floor((hexString || "").length / 2));
    let i;
    for (i = 0; i < bytes.length; i++) {
        const a = MAP_HEX[hexString[i * 2]];
        const b = MAP_HEX[hexString[i * 2 + 1]];
        if (a === undefined || b === undefined) {
            break;
        }
        bytes[i] = (a << 4) | b;
    }
    return i === bytes.length ? bytes : bytes.slice(0, i);
}

const PASSWORD_LENGTH = 88;
let cryptoParams = null;

async function getApiJSONData() {
    const rawDataBase64 = await fetch("https://maps.amtrak.com/services/MapDataService/trains/getTrainsData")
        .then(res => res.text());//get raw data

    const encryptedTrainData = Uint8Array.from(atob(rawDataBase64.slice(0, -PASSWORD_LENGTH)), m => m.charCodeAt(0));
    const encryptedPasswordFragments = Uint8Array.from(atob(rawDataBase64.slice(-PASSWORD_LENGTH)), m => m.charCodeAt(0));

    if(cryptoParams === null) {
        //Taken And Modified from mgwalker

        // First, the index of the public key is the sum of all zoom levels for all
        // routes, so let's get that real quick.
        const masterZoom = await fetch(
            "https://maps.amtrak.com/rttl/js/RoutesList.json",
        )
            .then((r) => r.json())
            .then((list) =>
                list.reduce((sum, { ZoomLevel }) => sum + (ZoomLevel ?? 0), 0),
            );

        // Then fetch the data containing our values.
        const cryptoData = await fetch(
            "https://maps.amtrak.com/rttl/js/RoutesList.v.json",
        ).then((r) => r.json());

        // And pull them out.
        cryptoParams = {
            publicKey: cryptoData.arr[masterZoom],
            // The salt and IV indices are equal to the length of any given value in the
            // array. So if salt[0] is 8 bytes long, then our value is at salt[8]. Etc.
            salt: fromHex(cryptoData.s[cryptoData.s[0].length]),
            iv: fromHex(cryptoData.v[cryptoData.v[0].length]),
        };
    }

    const decryptionAlgo = {
        name: "AES-CBC",
        iv: cryptoParams.iv
    }

    let deriveKey = await crypto.subtle.importKey("raw",
        Uint8Array.from(cryptoParams.publicKey, m => m.charCodeAt(0)),
        "PBKDF2",
        false,
        ["deriveKey"]
    );
    let privateKey = await crypto.subtle.deriveKey({
            name: "PBKDF2",
            hash: "SHA-1",
            iterations: 1000,
            salt: cryptoParams.salt
        },
        deriveKey,
        {
            name: "AES-CBC",
            length: 16*8,
        },
        false,
        ["decrypt"]
    );

    const decryptedPassword = await crypto.subtle.decrypt(decryptionAlgo, privateKey, encryptedPasswordFragments)
        .then(m => new TextDecoder().decode(m))
        .then(m => m.split("|")[0]);

    deriveKey = await crypto.subtle.importKey("raw",
        Uint8Array.from(decryptedPassword, m => m.charCodeAt(0)),
        "PBKDF2",
        false,
        ["deriveKey"]
    );
    privateKey = await crypto.subtle.deriveKey({
            name: "PBKDF2",
            hash: "SHA-1",
            iterations: 1000,
            salt: cryptoParams.salt
        },
        deriveKey,
        {
            name: "AES-CBC",
            length: 16*8,
        },
        false,
        ["decrypt"]
    );

    const decryptedTrainData = await crypto.subtle.decrypt(decryptionAlgo, privateKey, encryptedTrainData)
        .then(m => new TextDecoder().decode(m));

    return JSON.parse(decryptedTrainData);
}

export async function getTrainList() {
    let apiData = await getApiJSONData();

    let trainList = new Array(apiData.features.length);

    for(let i = 0; i < apiData.features.length; i++) {
        let train = apiData.features[i].properties;

        let lastStationReport = null;
        let nextStationReport = null;

        for(let stationNumber = 1; stationNumber <= 20; stationNumber++) {
            let currentStation = train["Station"+stationNumber];
            if(currentStation == null) break;
            currentStation = JSON.parse(currentStation);

            if(currentStation.postdep == null) {
                nextStationReport = currentStation;
                break;
            }
            lastStationReport = currentStation;
        }

        if(lastStationReport == null) {
            lastStationReport = nextStationReport
        }


        const tempTrain = new TrainInfo()
        tempTrain.number = train.TrainNum;
        tempTrain.routeName = train.RouteName
        tempTrain.speed = train.Velocity;
        tempTrain.heading = train.Heading;
        tempTrain.from = train.OrigCode;
        tempTrain.to = train.DestCode;
        tempTrain.scheduledDeparture = train.OrigSchDep;
        tempTrain.lastUpdate = train.updated_at;
        tempTrain.punctuality = lastStationReport.postcmnt;
        tempTrain.lastVisitedStation = lastStationReport.code
        tempTrain.state = train.TrainState;

        trainList[i] = tempTrain;
    }

    return trainList;
}