const jwt = require('jsonwebtoken');
require('dotenv').config();

const generalAccessToken = (payload) => {
    const access_token = jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRED });
    return access_token
}

const generalRefreshToken = (payload) => {
    const refresh_token = jwt.sign({ payload }, process.env.JWT_REFRESH_SECRET, { expiresIn: '365d' });
    return refresh_token
}

const refreshTokenService = (token) => {
    return new Promise(async (resolve, reject) => {
        // console.log('check token:', token)
        try {
            const decoded = await jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            if (!decoded.payload) {
                reject({
                    errCode: 1,
                    message: 'Not Authorize!'
                })
            }
            else {
                const access_token = await generalAccessToken(decoded.payload)
                resolve({
                    errCode: 0,
                    message: 'Refresh token success!',
                    access_token
                })
            }
        }
        catch (e) {
            console.error('Error in refreshTokenService:', e);
            reject({
                errCode: 500,
                message: 'Internal server error'
            })
        }
    })
}

module.exports = {
    generalAccessToken, generalRefreshToken,
    refreshTokenService
}