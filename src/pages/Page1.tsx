import Map from "@/components/leaflet/Map";
import Tei from "@/components/leaflet/layers/Tei";
import AggregateCondition from "@/components/legends/AggregateCondition";
import Operations from "@/components/legends/Operations";

const Page1 = () => {
  return (
    <>
      <Map>
        <Tei />
      </Map>
      {/* 凡例 */}
      <AggregateCondition />
      <Operations />
    </>
  );
};

export default Page1;
