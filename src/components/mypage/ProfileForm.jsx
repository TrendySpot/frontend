import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AxiosApi from "../../api/AxiosApi";

const EyeIcon = ({ visible }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke={visible ? "#6a5cff" : "#9ca3af"}
    strokeWidth="2"
  >
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

const ProfileForm = () => {
  const { member, updateMember } = useAuth();

  // 💡 [수정] form 상태에 currentPassword와 newPassword 구조 반영
  const [form, setForm] = useState({
    nickname: member?.nickname ?? "",
    currentPassword: "", // 현재 비밀번호 추가
    newPassword: "", // password -> newPassword로 변경
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // 💡 눈 아이콘 토글 상태들
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showPwConfirm, setShowPwConfirm] = useState(false);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: undefined }));
    setSuccess(false);
  };

  const validate = () => {
    const e = {};
    if (!form.nickname || form.nickname.length < 2)
      e.nickname = "닉네임은 2자 이상 20자 이하로 입력해주세요.";

    // 💡 [추가] 이제 수정을 하려면 현재 비밀번호는 무조건 입력해야 합니다.
    if (!form.currentPassword)
      e.currentPassword = "본인 확인을 위해 현재 비밀번호를 입력해주세요.";

    // 💡 [수정] form.password -> form.newPassword 검증으로 변경
    if (form.newPassword && form.newPassword.length < 8)
      e.newPassword = "새 비밀번호는 8자 이상이어야 합니다.";
    if (form.newPassword && form.newPassword !== form.passwordConfirm)
      e.passwordConfirm = "새 비밀번호가 일치하지 않습니다.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      // 💡 [수정] 백엔드 UpdateProfileRequest 스펙과 Key 매칭 맞추기
      const body = {
        nickname: form.nickname,
        currentPassword: form.currentPassword, // 필수 전송
      };

      // 새 비밀번호를 입력했을 때만 데이터에 추가해서 보냄
      if (form.newPassword) body.newPassword = form.newPassword;

      await AxiosApi.updateProfile(body);

      updateMember({ nickname: form.nickname });

      // 💡 저장 후 비밀번호 필드들만 깔끔하게 초기화
      setForm((p) => ({
        ...p,
        currentPassword: "",
        newPassword: "",
        passwordConfirm: "",
      }));
      setSuccess(true);
    } catch (err) {
      // 백엔드에서 뱉은 "현재 비밀번호가 일치하지 않습니다." 에러가 얼럿으로 뜸
      alert(err.response?.data?.message ?? "수정에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 420,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      {/* 이메일 (수정 불가) */}
      <div>
        <label className="input-label">이메일</label>
        <input className="input-field" value={member?.email ?? ""} disabled />
      </div>

      {/* 닉네임 */}
      <div>
        <label className="input-label">닉네임</label>
        <input
          className="input-field"
          name="nickname"
          value={form.nickname}
          onChange={handleChange}
          maxLength={20}
          placeholder="2자 이상 20자 이하"
        />
        {errors.nickname && <p className="input-error">{errors.nickname}</p>}
      </div>

      {/* 💡 [추가] 현재 비밀번호 입력 칸 (필수 항목) */}
      <div>
        <label className="input-label">
          현재 비밀번호{" "}
          <span style={{ color: "#ef4444", fontWeight: 700 }}>*</span>
        </label>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            className="input-field"
            name="currentPassword"
            type={showCurrentPw ? "text" : "password"}
            value={form.currentPassword}
            onChange={handleChange}
            placeholder="현재 비밀번호를 입력하세요"
            style={{ paddingRight: 44 }}
          />
          <button
            type="button"
            onClick={() => setShowCurrentPw((p) => !p)}
            style={{
              position: "absolute",
              right: 12,
              border: 0,
              background: "transparent",
              cursor: "pointer",
              display: "flex",
            }}
          >
            <EyeIcon visible={showCurrentPw} />
          </button>
        </div>
        {errors.currentPassword && (
          <p className="input-error">{errors.currentPassword}</p>
        )}
      </div>

      {/* 비밀번호 변경 (선택) */}
      <div>
        <label className="input-label">
          새 비밀번호{" "}
          <span style={{ color: "#9ca3af", fontWeight: 400 }}>
            (변경 시에만 입력)
          </span>
        </label>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* 💡 name과 value를 newPassword로 변경 */}
          <input
            className="input-field"
            name="newPassword"
            type={showNewPw ? "text" : "password"}
            value={form.newPassword}
            onChange={handleChange}
            placeholder="8자 이상"
            style={{ paddingRight: 44 }}
          />
          <button
            type="button"
            onClick={() => setShowNewPw((p) => !p)}
            style={{
              position: "absolute",
              right: 12,
              border: 0,
              background: "transparent",
              cursor: "pointer",
              display: "flex",
            }}
          >
            <EyeIcon visible={showNewPw} />
          </button>
        </div>
        {errors.newPassword && (
          <p className="input-error">{errors.newPassword}</p>
        )}
      </div>

      {/* 비밀번호 확인 */}
      {/* 💡 form.password -> form.newPassword 로 조건부 랜더링 변경 */}
      {form.newPassword && (
        <div>
          <label className="input-label">새 비밀번호 확인</label>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              className="input-field"
              name="passwordConfirm"
              type={showPwConfirm ? "text" : "password"}
              value={form.passwordConfirm}
              onChange={handleChange}
              placeholder="비밀번호 재입력"
              style={{ paddingRight: 44 }}
            />
            <button
              type="button"
              onClick={() => setShowPwConfirm((p) => !p)}
              style={{
                position: "absolute",
                right: 12,
                border: 0,
                background: "transparent",
                cursor: "pointer",
                display: "flex",
              }}
            >
              <EyeIcon visible={showPwConfirm} />
            </button>
          </div>
          {errors.passwordConfirm && (
            <p className="input-error">{errors.passwordConfirm}</p>
          )}
        </div>
      )}

      <div
        style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}
      >
        <button
          className="btn-primary"
          type="submit"
          disabled={loading}
          style={{ padding: "12px 28px", fontSize: 14 }}
        >
          {loading ? "저장 중..." : "수정 저장"}
        </button>
        {success && (
          <span style={{ fontSize: 13, color: "#059669", fontWeight: 600 }}>
            ✓ 저장되었습니다.
          </span>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;
