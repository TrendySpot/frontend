import AxiosInstance from "./axios";

const authApi = {
  login: (data) => AxiosInstance.post("/auth/login", data),

  signup: (data) => AxiosInstance.post("/auth/signup", data),

  checkEmail: (email) =>
    AxiosInstance.get("/auth/check-email", {
      params: { email },
    }),

  sendEmailCode: (email) =>
    AxiosInstance.post("/auth/email/send", { email }),

  verifyEmailCode: (data) =>
    AxiosInstance.post("/auth/email/verify", data),

  kakaoLogin: (code) =>
    AxiosInstance.post("/auth/kakao", { code }),
};

export default authApi;