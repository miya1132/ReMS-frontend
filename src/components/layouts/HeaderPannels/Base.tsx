import OdDemand from "./OdDemand";
import SupplyDemand from "./SupplyDemand";
import Top from "./Top";
import Operations from "./Operations";
import Transfer from "./Transfer";

const Base = ({ id }: { id: string }) => {
  switch (id) {
    case "top":
      return <Top />;
    case "supply_demand":
      return <SupplyDemand />;
    case "od_demand":
      return <OdDemand />;
    case "operations":
      return <Operations />;
    case "transfer":
      return <Transfer />;
    default:
      return (
        <div className="h-10 bg-gray-500 p-1.5 text-white flex items-center justify-start gap-2">
          Not yet implemented. Please implement.{" "}
          <span className="text-red-500 font-bold">
            {id} {Transfer.name}
          </span>
        </div>
      );
  }
};

export default Base;
