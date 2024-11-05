import Amtrak from './AmtrakAPI';

function TrainList(){
    function MakeTrain({
        train = new Amtrak.Train()
    }){
        return (
            <div className = 'train'>
                <h2>{train.routeName} Train #{train.number}</h2>
            </div>
        )
    } // end MakeTrain

    const testTrain = new Amtrak.Train();
    testTrain.routeName = "Northeast Regional";
    testTrain.number = 5;

    return (
        <div>
            <MakeTrain train = {testTrain}/>
        </div>
    )
} // end TrainList

export default TrainList;