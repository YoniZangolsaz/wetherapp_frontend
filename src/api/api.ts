import axios from "axios";
import { LoginInputsType } from "../components/LoginForm";
import { googleUser } from "../pages/Login";

export const baseUrl = import.meta.env.VITE_API_BACKEND_URL;
export const baseUrlPhoto = baseUrl.replace("/api", "");

axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (
      error.response?.status === 401 &&
      !error.config.url.includes("refresh")
    ) {
      const response = await tokenRefresh();

      if (response?.status === 200 || response?.status === 204) {
        localStorage.setItem("token", response.data.token);
        error.config.headers.Authorization = response.data.token;
        return axios(error.config);
      }
    }
    return error;
  }
);

const getTokenHeader = () => {
  const ls = localStorage.getItem("token");

  if (!ls) return { headers: { "Cache-Control": "no-cache" } };
  return { headers: { Authorization: ls, "Cache-Control": "no-cache" } };
};

const getTokenHeaderWithFormData = () => {
  const ls = localStorage.getItem("token");

  if (!ls) return { headers: { "Cache-Control": "no-cache" } };
  return {
    headers: { Authorization: ls, "Cache-Control": "no-cache" },
    "Content-Type": "multipart/form-data",
  };
};

const getRefreshTokenHeader = () => {
  const ls = localStorage.getItem("refreshToken");

  if (!ls) return { headers: { "Cache-Control": "no-cache" } };
  return { headers: { refreshtoken: ls, "Cache-Control": "no-cache" } };
};

export const createUser = async (user: FormData) => {
  const create = await axios.post(`${baseUrl}/users`, user, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return create.data;
};

export const createGoogleUser = async (user: googleUser) => {
  const createUser = await axios.post(`${baseUrl}/users/google`, user);
  return createUser.data;
};

export const login = async (user: LoginInputsType) => {
  const loginUser = await axios.post(`${baseUrl}/users/login`, user, {});
  return loginUser.data;
};

export const getUser = async () => {
  const getUsers = await axios.get(`${baseUrl}/users`, getTokenHeader());
  return getUsers.data;
};

export const tokenRefresh = async () => {
  const refreshToken = await axios.get(
    `${baseUrl}/users/refresh`,
    getRefreshTokenHeader()
  );
  return refreshToken;
};

export const getWeather = async (city: string) => {
  const weahter = await axios.get(
    `${baseUrl}/weather/${city}`,
    getTokenHeader()
  );
  return weahter.data;
};

export const createPhoto = async (photo: FormData) => {
  const create = await axios.post(
    `${baseUrl}/photos`,
    photo,
    getTokenHeaderWithFormData()
  );
  return create.data;
};

export const getAllPhotos = async (page = 1, limit = 10) => {
  const photos = await axios.get(
    `${baseUrl}/photos?page=${page}&limit=${limit}`,
    getTokenHeader()
  );
  return photos.data;
};

export const getCommentsByPhotoId = async (id: string) => {
  const comments = await axios.get(
    `${baseUrl}/comments/${id}`,
    getTokenHeader()
  );
  return comments.data;
};

export const postComment = async (photoId: string, comment: string) => {
  const comments = await axios.post(
    `${baseUrl}/comments/${photoId}`,
    { comment },
    getTokenHeader()
  );
  return comments.data;
};

export const updateDescription = async (
  photoId: string,
  description: string
) => {
  const update = await axios.put(
    `${baseUrl}/photos/${photoId}`,
    { description },
    getTokenHeader()
  );
  return update.data;
};

export const deletePhoto = async (photoId: string) => {
  const del = await axios.delete(
    `${baseUrl}/photos/${photoId}`,
    getTokenHeader()
  );
  return del.data;
};

export const updateUserNameByUserId = async (userId: string, name: string) => {
  const update = await axios.put(
    `${baseUrl}/users/${userId}`,
    { name },
    getTokenHeader()
  );
  return update.data;
};

export const logout = async () => {
  await axios.post(`${baseUrl}/users/logout`, {}, getTokenHeader());
};

export const deleteUser = async (userId: string) => {
  const deleteAccount = await axios.delete(
    `${baseUrl}/users/${userId}`,
    getTokenHeader()
  );
  return deleteAccount.data;
};

export const loginWithGoogle = async (response: any) => {
  const loginUser = await axios.get(
    `https://www.googleapis.com/oauth2/v3/userinfo`,
    {
      headers: {
        Authorization: `Bearer ${response.access_token}`,
      },
    }
  );
  return loginUser.data;
};
