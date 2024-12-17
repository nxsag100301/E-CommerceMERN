import axios from "./axios.customize";

const userLoginService = async (data) => {
    return await axios.post(`/user/login`, data)
}

const userSignUpService = async (data) => {
    return await axios.post('/user/register', data)
}

export {
    userLoginService, userSignUpService
}