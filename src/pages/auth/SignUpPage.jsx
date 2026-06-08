import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosApi from "../../api/AxiosApi";
import "./Auth.css";

const PW_REGEX    = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Field = ({ label, name, type = "text", placeholder, maxLength, value, onChange, error, rightElement }) => (
  <div>
    <label className="input-label">{label}</label>
    <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
      <input className="input-field" name={name} type={type} placeholder={placeholder}
        value={value} onChange={onChange} maxLength={maxLength}
        style={{ paddingRight: rightElement ? 44 : undefined }} />
      {rightElement && <div style={{ position: "absolute", right: 12 }}>{rightElement}</div>}
    </div>
    {error && <p className="input-error">{error}</p>}
  </div>
);

const EyeIcon = ({ visible }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke={visible ? "#6a5cff" : "#9ca3af"} strokeWidth="2">
    {visible ? (
      <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>
    ) : (
      <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" /></>
    )}
  </svg>
);

const SignUpPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "", password: "", passwordConfirm: "",
    nickname: "", termsAgreed: false,
  });
  const [errors, setErrors]               = useState({});
  const [codeSent, setCodeSent]           = useState(false);
  const [code, setCode]                   = useState("");
  const [verified, setVerified]           = useState(false);
  const [codeLoading, setCodeLoading]     = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [showPw, setShowPw]               = useState(false);
  const [showPwConfirm, setShowPwConfirm] = useState(false);

  const validate = () => {
    const e = {};
    if (!EMAIL_REGEX.test(form.email))          e.email           = "올바른 이메일 형식을 입력해주세요.";
    if (!verified)                              e.email           = "이메일 인증이 필요합니다.";
    if (!PW_REGEX.test(form.password))          e.password        = "8자 이상, 소문자·숫자·특수문자를 포함해주세요.";
    if (form.password !== form.passwordConfirm) e.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    if (!form.nickname || form.nickname.length < 2) e.nickname    = "닉네임은 2자 이상 20자 이하로 입력해주세요.";
    if (form.nickname.length > 20)              e.nickname        = "닉네임은 2자 이상 20자 이하로 입력해주세요.";
    if (!form.termsAgreed)                      e.terms           = "이용약관에 동의해주세요.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleSendCode = async () => {
    if (!EMAIL_REGEX.test(form.email)) { setErrors((p) => ({ ...p, email: "올바른 이메일 형식을 입력해주세요." })); return; }
    setCodeLoading(true);
    try {
      await AxiosApi.sendEmailCode(form.email);
      setCodeSent(true);
      alert("인증 코드가 발송되었습니다.");
    } catch (err) { setErrors((p) => ({ ...p, email: err.response?.data?.message ?? "발송 실패" })); }
    finally { setCodeLoading(false); }
  };

  const handleVerify = async () => {
    setVerifyLoading(true);
    try { await AxiosApi.verifyEmailCode(form.email, code); setVerified(true); }
    catch { alert("인증 코드가 올바르지 않습니다."); }
    finally { setVerifyLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitLoading(true);
    try {
      await AxiosApi.signup({ email: form.email, password: form.password, nickname: form.nickname, termsAgreed: form.termsAgreed });
      alert("회원가입이 완료되었습니다!");
      navigate("/login");
    } catch (err) { alert(err.response?.data?.message ?? "회원가입에 실패했습니다."); }
    finally { setSubmitLoading(false); }
  };

  const getPwStrength = () => {
    const pw = form.password;
    if (!pw) return null;
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[a-z]/.test(pw)) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/\d/.test(pw)) score++;
    if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pw)) score++;
    if (score <= 2) return { label: "약함", color: "#ef4444", width: "33%" };
    if (score <= 3) return { label: "보통", color: "#f59e0b", width: "66%" };
    return { label: "강함", color: "#10b981", width: "100%" };
  };
  const pwStrength = getPwStrength();

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit} style={{ width: 460, gap: 14 }}>
        <Link to="/" style={{ fontSize: 22, fontWeight: 900, color: "#6a5cff", textAlign: "center", display: "block" }}>
          Trendy Spot
        </Link>
        <h1>회원가입</h1>

        <div>
          <label className="input-label">이메일</label>
          <div style={{ display: "flex", gap: 8 }}>
            <input className="input-field" name="email" type="email" placeholder="example@email.com"
              value={form.email} onChange={handleChange} disabled={verified} style={{ flex: 1 }} />
            {!verified && (
              <button type="button" className="btn-secondary" onClick={handleSendCode} disabled={codeLoading}
                style={{ padding: "12px 14px", fontSize: 13, borderRadius: 12, flexShrink: 0 }}>
                {codeLoading ? "발송 중..." : codeSent ? "재발송" : "인증"}
              </button>
            )}
          </div>
          {errors.email && <p className="input-error">{errors.email}</p>}
        </div>

        {codeSent && !verified && (
          <div>
            <label className="input-label">인증 코드</label>
            <div style={{ display: "flex", gap: 8 }}>
              <input className="input-field" placeholder="인증 코드 6자리" value={code}
                onChange={(e) => setCode(e.target.value)} maxLength={6} style={{ flex: 1 }} />
              <button type="button" className="btn-primary" onClick={handleVerify} disabled={verifyLoading}
                style={{ padding: "12px 14px", fontSize: 13, borderRadius: 12, flexShrink: 0 }}>
                {verifyLoading ? "확인 중..." : "확인"}
              </button>
            </div>
          </div>
        )}
        {verified && <p style={{ fontSize: 13, color: "#059669", fontWeight: 600, margin: 0 }}>✓ 이메일 인증 완료</p>}

        <Field label="비밀번호" name="password" type={showPw ? "text" : "password"}
          placeholder="8자 이상, 소문자·숫자·특수문자 포함 (대문자 선택)"
          value={form.password} onChange={handleChange} error={errors.password}
          rightElement={
            <button type="button" onClick={() => setShowPw((p) => !p)}
              style={{ border: 0, background: "transparent", cursor: "pointer", padding: 0, display: "flex" }}>
              <EyeIcon visible={showPw} />
            </button>
          } />

        {pwStrength && (
          <div style={{ marginTop: -8 }}>
            <div style={{ height: 4, background: "#f1f2f6", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ height: "100%", width: pwStrength.width, background: pwStrength.color, borderRadius: 999, transition: "0.3s" }} />
            </div>
            <p style={{ fontSize: 11, color: pwStrength.color, marginTop: 4, fontWeight: 600 }}>
              비밀번호 강도: {pwStrength.label}
            </p>
          </div>
        )}

        <Field label="비밀번호 확인" name="passwordConfirm" type={showPwConfirm ? "text" : "password"}
          placeholder="비밀번호 재입력"
          value={form.passwordConfirm} onChange={handleChange} error={errors.passwordConfirm}
          rightElement={
            <button type="button" onClick={() => setShowPwConfirm((p) => !p)}
              style={{ border: 0, background: "transparent", cursor: "pointer", padding: 0, display: "flex" }}>
              <EyeIcon visible={showPwConfirm} />
            </button>
          } />

        <Field label="닉네임" name="nickname" placeholder="2자 이상 20자 이하"
          value={form.nickname} onChange={handleChange} error={errors.nickname} maxLength={20} />

        <div>
          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14 }}>
            <input type="checkbox" name="termsAgreed" checked={form.termsAgreed} onChange={handleChange}
              style={{ width: 16, height: 16, accentColor: "#6a5cff" }} />
            이용약관 및 개인정보처리방침 동의 <span style={{ color: "#ef4444" }}>(필수)</span>
          </label>
          {errors.terms && <p className="input-error" style={{ marginLeft: 24 }}>{errors.terms}</p>}
        </div>

        <button className="btn-primary" type="submit" disabled={!verified || submitLoading}
          style={{ width: "100%", padding: "16px", fontSize: 15, borderRadius: 16 }}>
          {submitLoading ? "가입 중..." : "회원가입"}
        </button>

        <Link to="/login" style={{ textAlign: "center", fontSize: 14, color: "#6b7280" }}>
          이미 계정이 있으신가요?{" "}
          <span style={{ color: "#6a5cff", fontWeight: 700 }}>로그인</span>
        </Link>
      </form>
    </div>
  );
};

export default SignUpPage;
