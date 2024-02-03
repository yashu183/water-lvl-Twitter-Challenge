import './App.css';
import { useEffect, useState } from 'react';
import Tanker from './Tanker';
 
function App() {
  const [totalWater, setTotalWater] = useState(0);
  const [avgWater, setAvgWater] = useState(0);
  const [isEmpty, setIsEmpty] = useState(false);
  const numOfTankers = 4;
  var tankers = [];

  for (let index = 0; index < numOfTankers; index++) {
    tankers.push(index);  
  }

  useEffect(() => {
    isEmpty ? setAvgWater(totalWater/numOfTankers) : setAvgWater(totalWater/(numOfTankers - 1))
  }, [totalWater, avgWater, isEmpty])

  return (
    <div className="flex justify-center">
      {
        tankers.map((tank, index) => {
          return <Tanker key={index} setTotalWater={setTotalWater} avgWater={avgWater} setIsEmpty={setIsEmpty} isEmpty={isEmpty} />
        })
      }
    </div>
  )
}
 
export default App;