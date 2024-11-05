import Amtrak from './AmtrakAPI';

function TrainList(){
    // simple component just to test stuff
    function MakeTrain({
        train = new Amtrak.Train()
    }){
        console.log(train)
        return (
            <div className = 'train'>
                <h2>{train.routeName} Train #{train.number}</h2>
            </div>
        )
    } // end MakeTrain

    const trainData = new Amtrak.APIInstance();

    // can only access information within the onUpdated function
    /*trainData.onUpdated = function() {
        console.log(this)
        
        this.trains.map(t =>
            console.log(t)
        ) 
    }*/

    trainData.update();
    // this is the weird null stuff I was talking about
    console.log(trainData);

    const testTrain = new Amtrak.Train();
    testTrain.routeName = "Northeast Regional";
    testTrain.number = 5;

    return (
        <div>
            <MakeTrain train = {testTrain}/>
        </div>
    )

    // if I could actually get the trainlist I could just do this
    
    return (
        <div>
            {
                trainData.trains.map(t =>
                    <MakeTrain train = {t}/>
                )
            }
        </div>
    )
    

} // end TrainList

export default TrainList;