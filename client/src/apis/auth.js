import axiosClient from "../configs/axiosConfig";

const registerAPI = async (data) => {
  const res = await axiosClient.post("/auth/register", data);
  if (res) {
    return res;
  }
};

const loginAPI = async (data) => {
  const res = await axiosClient.post("/auth/login", data);
  if (res) {
    return res;
  }
};

const logoutAPI = async (data) => {
  const res = await axiosClient.post("/auth/logout", data);
  if (res) {
    return res;
  }
};

const refreshTokenAPI = async () => {
  const res = await axiosClient.post("/auth/refresh-token");
  if (res) {
    return res;
  }
};

const socialLoginAPI = async (data) => {
  const res = await axiosClient.post("/auth/social-login", data);
  if (res) {
    return res;
  }
};

export { registerAPI, loginAPI, logoutAPI, refreshTokenAPI, socialLoginAPI };
