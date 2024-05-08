import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AxiosClientProvider } from "@/extends/AxiosClientProvider";
import { ThemeProvider } from "@/services/ThemeProvider";
import Login from "./pages/Login";
import Notfound from "@/pages/Notfound";
import Dashboard from "@/pages/Dashboard";
import Page1 from "@/pages/Page1";
import Page2 from "@/pages/Page2";

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
      <ThemeProvider defaultTheme="primary" storageKey="vite-ui-theme">
        <AxiosClientProvider>
          <Routes>
            <Route path="/" element={<RequireAuth component={<Dashboard />} />}>
              <Route index element={<Page1 />} />
              <Route path="page1" element={<Page1 />} />
              <Route path="page2" element={<Page2 />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </AxiosClientProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
