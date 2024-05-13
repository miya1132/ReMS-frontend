import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // SessionStorage の認可情報を削除
    sessionStorage.removeItem("AUTHORITY");

    // ログインページへリダイレクト
    navigate("/login");
  }, []);
  return <></>;
};

export default Logout;
