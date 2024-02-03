import { useEffect, useRef, useState } from "react";
 
let intervalId;
let levellingTimerId;
let inputInPrpogress = false;
 
const maxWaterLevel = 5000;
const outFlowWater = 250;
const InFlowWaterFromSource = 1000;
const timePeriodInMs = 1000;
 
function Tanker({setTotalWater, avgWater, setIsEmpty, isEmpty}) {
    const [currentWater, setCurrentWater] = useState(0);
    const avgWaterRef = useRef(avgWater);
    avgWaterRef.current = avgWater
 
    useEffect(() => {
        isEmpty ? setCurrentWater(Math.min(currentWater, avgWater)) : setCurrentWater(Math.max(currentWater, avgWater));
    }, [currentWater, avgWater, isEmpty])
    
    const addWater = () => {
        inputInPrpogress = true;
        intervalId = setInterval(() => {
            setCurrentWater(cw => {
                if(cw >= maxWaterLevel){
                    clearInterval(intervalId);
                    return maxWaterLevel;
                }else{
                    return cw + InFlowWaterFromSource;
                }
            });
        }, timePeriodInMs);
    }
 
    const stopAddingWater = () => {
        inputInPrpogress = false;
        clearInterval(intervalId);
        handleTheWaterAcrossTankers();
    }
 
    const emptyTheTanker = () => {
        // setCurrentWater(0);
        setIsEmpty(true);
    }
 
    const handleTheWaterAcrossTankers = () => {
        setIsEmpty(false);
        levellingTimerId = setInterval(() => {
            var isEquilibrium = false;
            setCurrentWater(cw => {
                if(cw === avgWaterRef.current){
                    clearInterval(levellingTimerId);
                    isEquilibrium = true;
                    return cw;
                }
                return cw - outFlowWater
            });
 
            setTotalWater(tw => {
                return isEquilibrium ? tw : tw + outFlowWater
            });
        }, timePeriodInMs);
        // setTotalWater(totalWater => totalWater + currentWater - avgWater);
    }
 
 
    return (
        <div className="p-4 w-1/6 h-60">
        <div className="btn-grp flex">
            <button className="w-28 h-12 bg-blue-500 rounded rounded-sm text-white mr-4"
            onMouseDown={addWater} onMouseUp={stopAddingWater} disabled={currentWater !== avgWater && !inputInPrpogress}>Add</button>
            <button className="w-28 h-12 bg-red-500 rounded rounded-sm" onClick={emptyTheTanker} disabled={currentWater !== avgWater && !inputInPrpogress}>Empty</button>
        </div>
        <div className="w-11/12 h-full border-2 border-rose-500 mt-4">
            <h1 className="w-fit m-auto">{currentWater}</h1>
        </div>
        </div>
    );
}
 
export default Tanker;