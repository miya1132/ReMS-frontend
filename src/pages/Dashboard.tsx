import { RecoilRoot, atom } from "recoil";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";

export const limitAtom = atom({
  key: "limit",
  default: 0,
});

const Dashboard = () => {
  return (
    <>
      <RecoilRoot>
        <div className="w-full h-full flex flex-col">
          <Header />
          <div className="flex-grow">
            <Outlet />
          </div>
        </div>
      </RecoilRoot>
    </>
  );
};

export default Dashboard;
