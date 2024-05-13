// import { FaGear } from "react-icons/fa6";
import React, { useState } from "react";
import { Icon } from "../../ui/Icon";
import "./SideBar.css";
import { NavLink } from "react-router-dom";

/**
 * サイドバーを表示するためのデータの型です。
 */
export interface SideBarMenu {
  id: string;
  title: string;
  path: string;
  icon: string;
}

/**
 * サイドバーを表示するためのコンポーネントです。
 */
const SideBar = ({
  menus,
}: {
  /**
   * メニューを表示するためのデータです。
   */
  menus: SideBarMenu[][];
}) => {
  const [activeMenu, setActiveMenu] = useState<string>(menus[0][0].id);

  const handleClick = (id: string) => {
    setActiveMenu(id);
  };

  return (
    <div className="navigation">
      {menus.map((m, i) => (
        <React.Fragment key={i}>
          <ul>
            {m.map((sub) => (
              <li className={activeMenu === sub.id ? "list active" : ""} key={sub.id}>
                <NavLink to={sub.path} onClick={() => handleClick(sub.id)}>
                  <span className="icon">
                    <Icon name={sub.icon} className="h-full w-full" />
                  </span>
                  <span className="title">{sub.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>
          {i !== menus.length - 1 ? <div className="h-1"></div> : <></>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default SideBar;
