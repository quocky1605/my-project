import { initScriptLoader } from "next/script";
import { useMemo, useState } from "react"
import { handleError } from "../helpers"
import userServices from "../services/userServices";
import { useGlobalState } from "../state";
import Cookies from "js-cookie"
import { useNotAuthen } from "../helpers/useAuthentication";
import { useRouter } from "next/router";
import { Button } from "../components/Button"



type DataRegister = {
    fullname: string,
    email: string,
    password: string,
    repassword: string
}
const initRegisterData: any = {
    fullname: {
        value: "",
        error: ""
    },
    email: {
        value: "",
        error: ""
    },
    password: {
        value: "",
        error: ""
    },
    re_password: {
        value: "",
        error: ""
    }

}


function Register() {
    useNotAuthen()
    const router = useRouter()
    const [registerData, setRegisterData] = useState(initRegisterData);
    const [, setToken] = useGlobalState("token")
    const [, setUserInfo] = useGlobalState("currentUser")
    const [loading, setLoading] = useState(false)

    const isValidate = useMemo((): boolean => {
        for (let key in registerData) {
            const error = registerData[key].error;
            if (error !== '') return false;
        }
        return true;
    }, [registerData]);


    const onChangeData = (key: string) => (e: any) => {
        const value = e.target.value
        const password = registerData.password.value
        const error = handleError(key, value, password)

        // console.log("key", key, "-----", "value", value);

        setRegisterData({
            ...registerData,
            [key]: {
                value,
                error
            }
        })
    }

    const handleRegister = (e: any) => {
        e.preventDefault()
        if (loading === true) return true
        if (!isValidate) {
            alert("dữ liệu không hợp lệ")
            return;
        }
        const fullname = registerData.fullname.value
        const email = registerData.email.value
        const password = registerData.password.value
        const re_password = registerData.re_password.value

        const data = {
            email,
            fullname,
            password,
            repassword: re_password
        }
        setLoading(true)
        userServices.registerUser(data)
            .then(res => {
                if (res.state = 200) {
                    console.log(res);
                    alert("đăng kí thành công")
                    setToken(res.token)
                    setUserInfo(res.user)
                    Cookies.set('token', res.token, { expires: 30 * 12 })
                    // router.push("/")
                } else {
                    alert(res.error)
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div className="ass1-login">
            <div className="ass1-login__logo">
                <a href="index.html" className="ass1-logo">ZendVn Meme</a>
            </div>
            <div className="ass1-login__content">
                <p>Đăng ký một tài khoản</p>
                <div className="ass1-login__form">
                    <form action="#" method="POST" onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                value={registerData.fullname.value}
                                onChange={onChangeData("fullname")}
                                type="text" className="form-control" placeholder="Tên hiển thị" required />
                            {registerData.fullname.error && <small className="form-text text-danger">{registerData.fullname.error}</small>}
                        </div>
                        <div className="form-group">
                            <input
                                value={registerData.email.value}
                                onChange={onChangeData("email")}
                                type="email" className="form-control" placeholder="Email" required />
                            {registerData.email.error && <small className="form-text text-danger">{registerData.email.error}</small>}
                        </div>
                        <div className="form-group">
                            <input
                                value={registerData.password.value}
                                onChange={onChangeData("password")}
                                type="password" className="form-control" placeholder="Mật khẩu" required />
                            {registerData.password.error && <small className="form-text text-danger">{registerData.password.error}</small>}
                        </div>
                        <div className="form-group">
                            <input
                                value={registerData.re_password.value}
                                onChange={onChangeData("re_password")}
                                type="password" className="form-control" placeholder="Nhập lại mật khẩu" required />
                            {registerData.re_password.error && <small className="form-text text-danger">{registerData.re_password.error}</small>}
                        </div>
                        <div className="ass1-login__send">
                            <a href="dang-nhap.html">Đăng nhập</a>
                            <Button type="submit" className="ass1-btn" isLoading={loading}>Đăng ký</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
export default Register