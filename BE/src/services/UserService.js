const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const { generalAccessToken, generalRefreshToken } = require('./JwtService');
const saltRounds = 10;


const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const emailExist = async (email) => {
    const user = await User.findOne({ email });
    if (user) {
        return true
    }
    else {
        return false
    }
}

const createUserService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { name, email, password, phone, isAdmin, address } = data
            const isEmailValid = validateEmail(email)
            const isEmailExist = await emailExist(email)
            const hashPass = hashPassword(password)
            if (!email || !password) {
                reject({
                    errCode: 1,
                    message: 'Missing input required!'
                });
            }
            else if (isEmailExist === true) {
                reject({
                    errCode: 2,
                    message: 'Email already exist!'
                });
            }
            else if (!isEmailValid) {
                reject({
                    errCode: 3,
                    message: 'Invalid email!'
                });
            }
            else {
                const newUser = await User.create({
                    name,
                    email,
                    password: hashPass,
                    phone,
                    isAdmin,
                    address
                })
                resolve({
                    errCode: 0,
                    message: "User created!",
                    user: {
                        name: newUser.name,
                        email: newUser.email
                    }
                });
            }
        }
        catch (e) {
            reject(e)
        }
    })
}

const userLoginService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { email, password } = data

            if (!email || !password) {
                reject({
                    errCode: 1,
                    message: 'Missing input params!'
                })
            }
            else {
                const user = await User.findOne({ email })
                if (!user) {
                    reject({
                        errCode: 2,
                        message: `Email doesn't exists!`
                    })
                }
                else {
                    const isMatch = await bcrypt.compare(password, user.password);
                    if (!isMatch) {
                        reject({
                            errCode: 3,
                            message: "Password incorrect!"
                        })
                    }
                    else {
                        const access_token = await generalAccessToken({
                            id: user._id,
                            email: user.email,
                            name: user.name,
                            isAdmin: user.isAdmin
                        })
                        const refresh_token = await generalRefreshToken({
                            id: user._id,
                            email: user.email,
                            name: user.name,
                            isAdmin: user.isAdmin
                        })
                        await User.updateOne({ email }, {
                            refresh_token: refresh_token
                        }, { upsert: true })
                        resolve({
                            errCode: 0,
                            message: "Logged in!",
                            user: {
                                email: user.email,
                                name: user.name,
                                avatar: user.avatar,
                                isAdmin: user.isAdmin,
                                access_token: access_token,
                                phone: user.phone,
                                address: user.address
                            },
                            refresh_token: refresh_token
                        })
                    }
                }
            }
        }
        catch (e) {
            console.error('Error in userLoginService:', e);
            reject({
                errCode: 500,
                message: 'Internal server error'
            })
        }
    })
}

const updateUserService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { id, name, phone, isAdmin, avatar, address } = data
            if (!id) {
                reject({
                    errCode: 1,
                    message: 'Missing input params!'
                })
            }
            else {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: id },
                    {
                        name,
                        phone,
                        isAdmin,
                        avatar,
                        address
                    },
                    {
                        new: true,
                        runValidators: true
                    }
                );
                if (!updatedUser) {
                    reject({
                        errCode: 2,
                        message: `User doesn't exists!`
                    })
                }
                else {
                    resolve({
                        errCode: 0,
                        message: 'User updated!',
                        userUpdate: {
                            email: updatedUser.email,
                            name: updatedUser.name,
                            phone: updatedUser.phone,
                            isAdmin: updatedUser.isAdmin,
                            avatar: updatedUser.avatar,
                            address: updatedUser.address
                        }
                    })
                }
            }
        }
        catch (e) {
            console.error('Error in updateUserService:', e);
            reject({
                errCode: 500,
                message: 'Internal server error'
            })
        }
    })
}

const deleteUserService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                reject({
                    errCode: 1,
                    message: "Missing input params!"
                })
            }
            else {
                const deletedUser = await User.findByIdAndDelete({ _id: id });
                if (!deletedUser) {
                    reject({
                        errCode: 2,
                        message: `User doesn't exists!`
                    })
                }
                else {
                    resolve({
                        errCode: 0,
                        message: 'User deleted!',
                    })
                }
            }
        }
        catch (e) {
            console.error('Error in deleteUserService:', e);
            reject({
                errCode: 500,
                message: 'Internal server error'
            })
        }
    })
}

const getUserService = (limit, currentPage, sort, filterBy, filterValue) => {
    return new Promise(async (resolve, reject) => {
        try {
            const offset = limit * (currentPage - 1)
            const totalItems = await User.countDocuments()
            const totalPages = Math.ceil(totalItems / (limit || 10))
            if (sort) {
                const objectSort = {};
                const [a, b] = sort.split(' ');
                objectSort[b] = a;
                const allUserSort = await User.find().limit(limit || 10).skip(offset || 0).sort(objectSort).select('-avatar -password')
                resolve({
                    errCode: 0,
                    message: `Sort user by "${b}" success!`,
                    allUserSort,
                    totalUsers: totalItems,
                    totalPages,
                    currentPage
                })
            }
            else if (filterBy && filterValue) {
                const objectFilter = {}
                objectFilter[filterBy] = { $regex: filterValue, $options: 'i' }
                const allUserFilter = await User.find(objectFilter).limit(limit || 10).skip(offset || 0).select('-avatar -password')
                resolve({
                    errCode: 0,
                    message: `Filter user by "${filterBy}" success!`,
                    allUserFilter,
                    totalUsers: totalItems,
                    totalPages,
                    currentPage
                })
            }
            else {
                const allUsers = await User.find().limit(limit || 10).skip(offset || 0).select('-avatar -password')
                resolve({
                    errCode: 0,
                    message: "Get all users success!",
                    allUsers,
                    totalUsers: totalItems,
                    totalPages,
                    currentPage
                })
            }
        }
        catch (e) {
            console.error('Error in getUserService:', e);
            reject({
                errCode: 500,
                message: 'Internal server error'
            })
        }
    })
}

const getDetailUserService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                reject({
                    errCode: 1,
                    message: 'Missing input params!'
                })
            }
            else {
                let user = await User.findOne({ _id: id }, { password: 0 })
                if (!user) {
                    reject({
                        errCode: 2,
                        message: `User doesn't exists!`
                    })
                }
                else {
                    resolve({
                        errCode: 0,
                        message: "Get user success!",
                        user
                    })
                }
            }
        }
        catch (e) {
            console.error('Error in getUserService:', e);
            reject({
                errCode: 500,
                message: 'Internal server error'
            })
        }
    })
}


module.exports = {
    createUserService, userLoginService,
    updateUserService, deleteUserService,
    getUserService, getDetailUserService,

}