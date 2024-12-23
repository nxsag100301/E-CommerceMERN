import axios from "axios"


export const userLoginService1 = async (data) => {
    return await axios.post(`${process.env.REACT_APP_URL_BACKEND}/user/login`, data)
}

export const refreshTokenDefault = async (token) => {
    return await axios.post(`${process.env.REACT_APP_URL_BACKEND}/user/refresh-token`, token);
}