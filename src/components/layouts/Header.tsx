import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import Base from "./HeaderPannels/Base";

export interface Menu {
  id: string;
  title: string;
  path: string;
}

function Header({ menus }: { menus: Menu[][] }) {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState<string>("top");

  const handleClick = (id: string) => {
    setActiveMenu(id);
  };

  const handleLogoutClick = () => {
    // ログインページへリダイレクト
    navigate("/logout");
  };

  const activeMenuStyles = "inline-block w-32 rounded-tr-3xl bg-gray-500 p-1.5";
  const defaultMenuStyles =
    "inline-block w-32 rounded-tr-3xl bg-gray-700 p-1.5 hover:bg-gray-500 hover:text-gray-600";

  return (
    <div className="mt-1 bg-gray-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5 overflow-x-auto">
          {menus.map((m, i) => (
            <React.Fragment key={i}>
              <ul className="flex  border-gray-200 text-center text-white text-light">
                {m.map((sub) => (
                  <li key={sub.id} className="me-1">
                    <NavLink
                      to={sub.path}
                      className={activeMenu === sub.id ? activeMenuStyles : defaultMenuStyles}
                      onClick={() => handleClick(sub.id)}
                    >
                      {sub.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
              {i !== menus.length - 1 ? <div className="border h-6 mx-2"></div> : <></>}
            </React.Fragment>
          ))}
        </div>

        {/* TODO：ボタンの状態をタブで変更する */}
        <div className=" min-w-[310px] flex justify-center mx-2">
          <div className="inline-flex text-xs">
            <button className="rounded-l bg-gray-600 px-4 py-1 text-gray-400">全体</button>
            <button className="bg-green-600 px-4 py-1 text-white hover:bg-green-500">平均</button>
            <button className="rounded-r bg-gray-100 px-4 py-1 text-gray-800 hover:bg-gray-400">
              詳細
            </button>

            <button
              className="rounded bg-gray-100 px-4 py-1 text-gray-800 hover:bg-gray-400 ml-5"
              onClick={handleLogoutClick}
            >
              ログオフ
            </button>
          </div>
        </div>
      </div>

      {/* コンポーネントをタブで変更する */}
      <Base id={activeMenu} />
    </div>
  );
}

export default Header;
