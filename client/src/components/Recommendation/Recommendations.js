import Recommendation from "./Recommendation";

function Recommendations({ data }) {
  return data.map((recommendation, index) => (
    <Recommendation key={index} number={index+1} parkingLot={recommendation}/>
  ))
}

export default Recommendations;
