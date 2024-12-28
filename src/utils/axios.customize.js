import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { refreshTokenDefault } from "../services/UserService";

const instance = axios.create({
  baseURL: process.env.REACT_APP_URL_BACKEND
});

// Add a request interceptor
instance.interceptors.request.use(async function (config) {
  const accessToken = localStorage.getItem('access_token')
  const refreshToken = localStorage.getItem('refresh_token')
  config.headers.Authorization = `Bearer ${accessToken}`
  let tokenRefreshed = ''
  // Do something before request is sent
  if (accessToken && refreshToken) {
    const decodedToken = jwtDecode(accessToken)
    const currentTime = Math.floor(Date.now() / 1000)
    if (decodedToken.exp - currentTime < 5) {
      try {
        const token = localStorage.getItem('refresh_token')
        const res = await refreshTokenDefault({ token })
        if (res?.data?.errCode === 0) {
          tokenRefreshed = res?.data?.access_token
          config.headers.Authorization = `Bearer ${tokenRefreshed}`
        }
        else {
          console.log(res?.message)
        }
      }
      catch (error) {
        throw error;
      }
    }
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response?.data ? response.data : response
}, async function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error?.response?.data) return error.response.data

  return Promise.reject(error);
});
export default instance