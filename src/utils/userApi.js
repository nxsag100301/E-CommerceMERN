import axios from "./axios.customize"

const userLoginService = async (data) => {
    return await axios.post(`/user/login`, data)
}

const userSignUpService = async (data) => {
    return await axios.post('/user/register', data)
}

const refreshToken = async (token) => {
    return await axios.post('/user/refresh-token', token);
};

const getDetailUser = async (id) => {
    return await axios.get(`/user/detail/${id}`);
};

const postUpdateUser = async (data) => {
    return await axios.put('/user/update', data);
}

const getAllUser = async (data) => {
    return await axios.get('/user', {
        params: {
            limit: data.limit,
            currentPage: data.currentPage,
            filterBy: data.filterBy,
            filterValue: data.filterValue
        },
    })
}

const postCreateUser = async (data) => {
    return await axios.post('/user/register', data)
}

const deleteUser = async (id) => {
    return await axios.delete('user/delete', { params: { id } })
}

export {
    userLoginService, userSignUpService, refreshToken,
    getDetailUser, postUpdateUser, getAllUser, postCreateUser,
    deleteUser
}