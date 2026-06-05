import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    nickname: "",
    address: "",
    phone: "",
    terms: false,
    privacy: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!form.terms || !form.privacy) {
      alert("약관에 동의해주세요.");
      return;
    }

    alert("회원가입이 완료되었습니다.");
    navigate("/login");
  };

  return (
    <div className="auth-page">
      <form className="auth-card signup-card" onSubmit={handleSignup}>
        <h1>회원가입</h1>
        <p>간단한 정보 입력 후 Trendy Spot을 시작해보세요.</p>

        <input name="email" placeholder="이메일" onChange={handleChange} />
        <button type="button">중복 확인</button>
        <button type="button">이메일 인증</button>

        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          onChange={handleChange}
        />

        <input name="name" placeholder="이름" onChange={handleChange} />
        <input name="nickname" placeholder="닉네임" onChange={handleChange} />
        <input name="address" placeholder="주소" onChange={handleChange} />
        <input name="phone" placeholder="전화번호" onChange={handleChange} />

        <label>
          <input name="terms" type="checkbox" onChange={handleChange} />
          이용약관 동의
        </label>

        <label>
          <input name="privacy" type="checkbox" onChange={handleChange} />
          개인정보 처리방침 동의
        </label>

        <button type="submit">가입하기</button>
      </form>
    </div>
  );
};

export default SignUpPage;