import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    login({
      accessToken: "dummy-token",
      member: {
        email: form.email,
        nickname: "트렌디유저",
        role: "ROLE_USER",
      },
    });

    navigate("/");
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleLogin}>
        <h1>로그인</h1>
        <p>Trendy Spot에서 새로운 경험을 찾아보세요.</p>

        <input
          name="email"
          placeholder="이메일"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit">로그인</button>

        <button type="button" className="kakao-btn">
          카카오 로그인
        </button>

        <Link to="/signup">아직 회원이 아니신가요?</Link>
      </form>
    </div>
  );
};

export default LoginPage;