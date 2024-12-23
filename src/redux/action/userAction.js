import { userLoginService1 } from "../../services/UserService"
import { userLoginService } from "../../utils/userApi"
import { message } from "antd"


const userLoginServiceRedux = async (email, password) => {
    let res = await userLoginService({
        email,
        password
    })
    if (res.errCode === 0) {
        message.info('Đăng nhập thành công!')
        const access_token = res?.user?.access_token
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('refresh_token', res?.refresh_token)
        const userData = {
            name: res?.user?.name,
            email: res?.user?.email,
            avatar: res?.user?.avatar,
            phone: res?.user?.phone,
            address: res?.user?.address
        };
        return userData
    }
    else {
        message.error(res?.message)
        return null
    }
}

const userLoginServiceRedux1 = async (email, password) => {
    let res = await userLoginService1({
        email,
        password
    })
    if (res?.data?.errCode === 0) {
        message.info('Đăng nhập thành công!')
        const access_token = res?.data?.user?.access_token
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('refresh_token', res?.data?.refresh_token)
        const userData = {
            name: res?.data?.user?.name,
            email: res?.data?.user?.email,
            avatar: res?.data?.user?.avatar,
            phone: res?.data?.user?.phone,
            address: res?.data?.user?.address
        };
        return userData
    }
    else {
        message.error(res?.message)
        return null
    }
}


export {
    userLoginServiceRedux, userLoginServiceRedux1
}