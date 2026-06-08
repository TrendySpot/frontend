import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";
import AxiosApi from "../../api/AxiosApi";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const { member, isLoggedIn, logout } = useAuth();
  const { clear } = useWishlist();

  const handleLogout = async () => {
    try { await AxiosApi.logout(); } catch {}
    logout();
    clear();
    navigate("/");
  };

  return (
    <header className="header">
      <Link to="/" className="logo">Trendy Spot</Link>
      <nav className="nav">
        <Link to="/search">스팟 찾기</Link>
        {isLoggedIn ? (
          <>
            <Link to="/mypage">{member?.nickname || "마이페이지"}</Link>
            {member?.role === "ROLE_ADMIN" && <Link to="/admin">관리자</Link>}
            <button onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          <>
            <Link to="/login">로그인</Link>
            <Link to="/signup">회원가입</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
