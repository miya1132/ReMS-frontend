import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/useUser";
import { useNavigate } from "react-router-dom";

type User = {
  id: string;
  name: string;
  email: string;
};

const Page2 = () => {
  const navigate = useNavigate();
  const { users } = useUser();

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
      {users &&
        users.map((user: User) => (
          <li key={user.id}>
            <span>{user.name}</span>
            <span>{user.email}</span>
          </li>
        ))}
      <Button onClick={handleLogoutClick}>ログオフ</Button>
    </div>
  );
};

export default Page2;
