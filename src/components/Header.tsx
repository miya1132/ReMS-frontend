import { useState } from "react";
import { NavLink } from "react-router-dom";
// import useSWR from "swr";
import { AxiosResponse } from "axios";
import axiosClient from "@/extends/AxiosClientProvider";

function Header() {
  const [activeMenu, setActiveMenu] = useState<string>("");

  // TODO：定義ファイルなどに移動
  const menus = [
    { id: "0", title: "トップ", path: "" },
    { id: "1", title: "受給状況", path: "/page1" },
    { id: "2", title: "OD需要", path: "/page2" },
    { id: "3", title: "設定", path: "/page2" },
  ];

  const handleClick = (id: string) => {
    setActiveMenu(id);
  };

  const getData = () => {
    axiosClient.get(import.meta.env.VITE_API_HOST + `/teis`).then((response: AxiosResponse) => {
      response.data;
    });
  };

  const handleSearchClick = async () => {
    console.log("handleSearchClick!!");

    const data = await getData();
    console.log(data);
  };

  const activeMenuStyles = "inline-block w-32 rounded-tr-3xl bg-gray-500 p-1.5";
  const defaultMenuStyles =
    "inline-block w-32 rounded-tr-3xl bg-gray-700 p-1.5 hover:bg-gray-500 hover:text-gray-600";

  return (
    <div className="mt-1 bg-gray-800">
      <div className="flex items-center justify-between">
        <ul className="flex flex-wrap border-gray-200 text-center text-sm text-white">
          {menus.map((m) => (
            <li key={m.id} className="me-1">
              <NavLink
                to={m.path}
                className={activeMenu === m.id ? activeMenuStyles : defaultMenuStyles}
                onClick={() => handleClick(m.id)}
              >
                {m.title}
              </NavLink>
            </li>
          ))}
        </ul>
        {/* TODO：ボタンの状態をタブで変更する */}
        <div className="mr-5">
          <div className="inline-flex text-xs">
            <button className="rounded-l bg-gray-600 px-4 py-1 text-gray-400">全体</button>
            <button className="bg-green-600 px-4 py-1 text-white hover:bg-green-500">平均</button>
            <button className="rounded-r bg-gray-100 px-4 py-1 text-gray-800 hover:bg-gray-400">
              詳細
            </button>
          </div>
        </div>
      </div>
      {/* TODO：コンポーネントをタブで変更する */}
      <div className="bg-gray-500 p-1.5 text-white flex items-center justify-start gap-2">
        <label htmlFor="limit">Limit：</label>
        <input
          type="number"
          id="limit"
          className="text-gray-900 rounded border border-input bg-background px-1.5 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
        <button
          onClick={handleSearchClick}
          className="text-sm font-medium rounded bg-gray-100 px-4 py-0.4 text-gray-800 hover:bg-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          検索
        </button>
      </div>
    </div>
  );
}

export default Header;
