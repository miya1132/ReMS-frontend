// import { atom } from "recoil";
import { Outlet } from "react-router-dom";
import Header from "@/components/layouts/Header";

// export const limitAtom = atom({
//   key: "limit",
//   default: 10000,
// });
// TODO：atomをファイルにまとめる
// export const searchAtom = atom({
//   key: "search",
//   default: false,
// });

// export const searchKeyAtom = atom({
//   key: "search_key",
//   default: {
//     // バス停検索最大件数
//     limit: 10000,
//   },
// });

// TODO：定義ファイルなどに移動？
//  ※idはユニーク
const menus = [
  [
    { id: "top", title: "トップ", path: "" },
    { id: "supply_demand", title: "需給状況", path: "/page2" },
    { id: "od_demand", title: "OD需要", path: "/page3" },
    { id: "operations", title: "運行状況", path: "/page4" },
  ],
  [{ id: "transfer", title: "乗継分析", path: "/page5" }],
  [{ id: "sample1", title: "サンプル1", path: "/page6" }],
  [{ id: "sample2", title: "サンプル2", path: "/page7" }],
  [{ id: "side_bar", title: "サイドバーに変更", path: "/2" }],
];

const Dashboard = () => {
  return (
    <>
      <div className="w-full h-full flex flex-col bg-gray-800">
        <Header menus={menus} />
        <div className="flex-grow">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
