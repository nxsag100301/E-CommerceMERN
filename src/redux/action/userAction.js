import { toast } from "react-toastify"
import { userLoginService } from "../../utils/userApi"


const userLoginServiceRedux = async (email, password) => {
    let res = await userLoginService({
        email,
        password
    })
    if(res.errCode === 0){
        toast.success('Đăng nhập thành công!')
        const token = res?.user?.access_token
        localStorage.setItem('access_token', token)
        const userData = {
            name: res?.user?.name,
            email: res?.user?.email,
        };
        return userData
    }
    else{
        toast.error(`${res?.message}`)
        return null
    }
}

export {
    userLoginServiceRedux
}