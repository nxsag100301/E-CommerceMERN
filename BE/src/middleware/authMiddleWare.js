const jwt = require('jsonwebtoken')
require('dotenv').config();

const authMiddleWareIsAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.payload.isAdmin === true) {
            next()
        }
        else {
            return res.status(404).json({
                errCode: 1,
                message: "Not authorize!"
            })
        }
    }
    catch (e) {
        console.log(e)
        return res.status(404).json({
            errCode: 2,
            message: "Not authorize!"
        })
    }

}

const authMiddleWareIsUser = async (req, res, next) => {
    try {
        const userId = req.body.user
        const token = req.headers.authorization.split(' ')[1];
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.payload.isAdmin === true || decoded.payload.id === userId) {
            next()
        }
        else {
            return res.status(404).json({
                errCode: 1,
                message: "Not authorize!"
            })
        }
    }
    catch (e) {
        console.log(e)
        return res.status(404).json({
            errCode: 2,
            message: "Not authorize!"
        })
    }
}

const authMiddleWareIsUserParams = async (req, res, next) => {
    try {
        const userId = req.params.id
        const token = req.headers.authorization.split(' ')[1];
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.payload.isAdmin === true || decoded.payload.id === userId) {
            next()
        }
        else {
            return res.status(404).json({
                errCode: 1,
                message: "Not authorize!"
            })
        }
    }
    catch (e) {
        console.log(e)
        return res.status(404).json({
            errCode: 2,
            message: "Not authorize!"
        })
    }

}


module.exports = {
    authMiddleWareIsAdmin,
    authMiddleWareIsUser,
    authMiddleWareIsUserParams
}