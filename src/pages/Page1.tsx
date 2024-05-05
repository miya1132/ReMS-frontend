import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Page1 = () => {
  const navigate = useNavigate();

  // handleLogoutClickイベントハンドラ
  const handleLogoutClick = () => {
    // TODO：ここはサービスに変更する
    // SessionStorage の認可情報を削除
    sessionStorage.removeItem("AUTHORITY");

    // ログインページへリダイレクト
    navigate("/login");
  };

  return (
    <div>
      Page1
      <Button onClick={handleLogoutClick}>ログオフ</Button>
    </div>
  );
};

export default Page1;
