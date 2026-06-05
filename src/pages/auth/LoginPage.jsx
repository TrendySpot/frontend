import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";
import AxiosApi from "../../api/AxiosApi";

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${
  process.env.REACT_APP_KAKAO_CLIENT_ID
}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;

const EyeIcon = ({ visible }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke={visible ? "#6a5cff" : "#9ca3af"} strokeWidth="2">
    {visible ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    )}
  </svg>
);

const LoginPage = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { login } = useAuth();
  const { fetchWishlist } = useWishlist();
  const from = location.state?.from?.pathname ?? "/";

  const [form, setForm]       = useState({ email: "", password: "" });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw]   = useState(false);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await AxiosApi.login(form.email, form.password);
      // 백엔드 LoginResponse: { accessToken, refreshToken, nickname, role }
      const { accessToken, refreshToken, nickname, role } = data.data;
      login({ accessToken, refreshToken, nickname, role });
      await fetchWishlist();
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message ?? "이메일 또는 비밀번호가 올바르지 않습니다.");
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <Link to="/" style={{ fontSize: 22, fontWeight: 900, color: "#6a5cff", textAlign: "center", display: "block" }}>
          Trendy Spot
        </Link>
        <h1 style={{ margin: 0 }}>로그인</h1>
        <p style={{ margin: 0, color: "#6b7280", fontSize: 14 }}>
          Trendy Spot에서 새로운 경험을 찾아보세요.
        </p>

        <input className="input-field" name="email" type="email" placeholder="이메일"
          value={form.email} onChange={handleChange} required autoComplete="email" />

        {/* 비밀번호 + 눈 아이콘 */}
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <input className="input-field" name="password"
            type={showPw ? "text" : "password"}
            placeholder="비밀번호"
            value={form.password} onChange={handleChange}
            required autoComplete="current-password"
            style={{ paddingRight: 44 }} />
          <button type="button" onClick={() => setShowPw((p) => !p)}
            style={{ position: "absolute", right: 12, border: 0,
                     background: "transparent", cursor: "pointer", display: "flex" }}>
            <EyeIcon visible={showPw} />
          </button>
        </div>

        {error && (
          <p style={{ fontSize: 13, color: "#ef4444", fontWeight: 500, margin: 0 }}>{error}</p>
        )}

        <button className="btn-primary" type="submit" disabled={loading}
          style={{ width: "100%", padding: "16px", fontSize: 15, borderRadius: 16 }}>
          {loading ? "로그인 중..." : "로그인"}
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
          <span style={{ fontSize: 12, color: "#9ca3af" }}>또는</span>
          <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
        </div>

        <a href={KAKAO_AUTH_URL} className="btn-kakao">카카오 로그인</a>

        <Link to="/signup" style={{ textAlign: "center", fontSize: 14, color: "#6b7280" }}>
          아직 계정이 없으신가요?{" "}
          <span style={{ color: "#6a5cff", fontWeight: 700 }}>회원가입</span>
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
