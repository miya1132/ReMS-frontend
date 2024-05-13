import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AxiosClientProvider } from "@/extends/AxiosClientProvider";
import Login from "./pages/Login";
import Notfound from "@/pages/Notfound";
import Dashboard from "@/pages/Dashboard";
import Page1 from "@/pages/Page1";
import Page2 from "@/pages/Page2";
import Page3 from "@/pages/Page3";
import Page4 from "./pages/Page4";
import Page5 from "./pages/Page5";
import Dashboard2 from "./pages/Dashboard2";
import { RecoilRoot, atom } from "recoil";
import Logout from "./pages/Logout";
import Page6 from "./pages/Page6";
import Page7 from "./pages/Page7";

export const searchAtom = atom({
  key: "search",
  default: false,
});

export const searchKeyAtom = atom({
  key: "search_key",
  default: {
    // バス停検索最大件数
    limit: 10000,
  },
});

function App() {
  // 認証確認メソッド
  const RequireAuth: React.FC<{ component: JSX.Element }> = ({ component }) => {
    const myAuthority = sessionStorage.getItem("AUTHORITY");

    // TODO：tokenからexpireを判定する
    if (myAuthority !== null) {
      return component;
    } else {
      // 認証されていない場合、ログインページにリダイレクト
      return <Navigate to="/login" />;
    }
  };

  return (
    <BrowserRouter>
      <AxiosClientProvider>
        <RecoilRoot>
          <Routes>
            <Route path="/" element={<RequireAuth component={<Dashboard />} />}>
              <Route index element={<Page1 />} />
              <Route path="page1" element={<Page1 />} />
              <Route path="page2" element={<Page2 />} />
              <Route path="page3" element={<Page3 />} />
              <Route path="page4" element={<Page4 />} />
              <Route path="page5" element={<Page5 />} />
              <Route path="page6" element={<Page6 />} />
              <Route path="page7" element={<Page7 />} />
            </Route>
            <Route path="/2" element={<RequireAuth component={<Dashboard2 />} />}>
              <Route index element={<Page1 />} />
              <Route path="page1" element={<Page1 />} />
              <Route path="page2" element={<Page2 />} />
              <Route path="page3" element={<Page3 />} />
              <Route path="page4" element={<Page4 />} />
              <Route path="page5" element={<Page5 />} />
              <Route path="page6" element={<Page6 />} />
              <Route path="page7" element={<Page7 />} />
            </Route>
            <Route path="/logout" element={<Logout />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </RecoilRoot>
      </AxiosClientProvider>
    </BrowserRouter>
  );
}

export default App;
