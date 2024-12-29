const { createUserService, userLoginService, updateUserService, deleteUserService, getUserService, getDetailUserService } = require("../services/UserService")
const { refreshTokenService } = require("../services/JwtService")

const createUser = async (req, res) => {
    try {
        const newUser = await createUserService(req.body)
        return res.status(200).json(newUser)
    }
    catch (e) {
        // console.log(e)
        return res.status(404).json(e)
    }
}

const userLogin = async (req, res) => {
    try {
        const response = await userLoginService(req.body)
        const { refresh_token, ...newResponse } = response

        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'None'
        })
        return res.status(200).json(response)
    }
    catch (e) {
        // console.log(e)
        return res.status(404).json(e)
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await updateUserService(req.body)
        return res.status(200).json(user)
    }
    catch (e) {
        console.log(e)
        return res.status(404).json(e)
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.query.id
        const response = await deleteUserService(id)
        return res.status(200).json(response)
    }
    catch (e) {
        // console.log(e)
        return res.status(404).json(e)
    }
}

const getUser = async (req, res) => {
    try {
        const { limit, currentPage, sort, filterBy, filterValue } = req.query
        const response = await getUserService(limit, currentPage, sort, filterBy, filterValue)
        return res.status(200).json(response)
    }
    catch (e) {
        // console.log(e)
        return res.status(404).json(e)
    }
}

const getDetailUser = async (req, res) => {
    try {
        const response = await getDetailUserService(req.params.id)
        return res.status(200).json(response)
    }
    catch (e) {
        // console.log(e)
        return res.status(404).json(e)
    }
}

const refreshToken = async (req, res) => {
    try {
        // const token = req.cookies.refresh_token
        const token = req.body.token
        const response = await refreshTokenService(token)
        return res.status(200).json(response)
    }
    catch (e) {
        console.log(e)
        return res.status(404).json(e)
    }
}

module.exports = {
    createUser, userLogin,
    updateUser, deleteUser, getUser,
    getDetailUser, refreshToken
}