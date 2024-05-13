import { Outlet } from "react-router-dom";
import SideBar from "@/components/layouts/SideBar";

const menus = [
  [
    { id: "top", title: "トップ", path: "/2", icon: "FaHome" },
    { id: "supply_demand", title: "需給状況", path: "/2/page2", icon: "FaMap" },
    { id: "od_demand", title: "OD需要", path: "/2/page4", icon: "FaSitemap" },
    { id: "operations", title: "運行状況", path: "/2/page4", icon: "FaMapPin" },
  ],
  [{ id: "transfer", title: "乗継分析", path: "/2/page5", icon: "FaMoneyBillTransfer" }],
  [{ id: "sample1", title: "サンプル1", path: "/2/page6", icon: "FaCarSide" }],
  [{ id: "sample2", title: "サンプル2", path: "/2/page7", icon: "FaCarSide" }],
  [{ id: "menu04", title: "ログオフ", path: "/logout", icon: "FaSignOutAlt" }],
  [{ id: "header", title: "ヘッダに変更", path: "/", icon: "FaExchangeAlt" }],
];

const Dashboard2 = () => {
  return (
    <>
      <div className="flex flex-row w-full h-full">
        <SideBar menus={menus} />
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard2;
