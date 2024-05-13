import Passengers from "@/components/charts/Passengers";

const datasets = [
  { number: 3, timeSlot: "12" },
  { number: 1, timeSlot: "08" },
  { number: 3, timeSlot: "10" },
  { number: 2, timeSlot: "09" },
  { number: 2, timeSlot: "13" },
  { number: 2, timeSlot: "15" },
  { number: 1, timeSlot: "16" },
  { number: 1, timeSlot: "17" },
];

// { number: 0.6, timeSlot: "平均" },
const Page6 = () => {
  return (
    <div className="h-full w-full flex flex-col">
      <p>Page6</p>
      <Passengers datasets={datasets} />
    </div>
  );
};

export default Page6;
