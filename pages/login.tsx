
import { useEffect, useState } from "react"
import fetch from "isomorphic-fetch"
import Link from "next/link"
import Router, { useRouter } from "next/router"
import { useGlobalState } from "../state"
import { useNotAuthen } from "../helpers/useAuthentication"
import { Button } from "../components/Button"
// import Cookies from "js-cookie"

interface FormLogin {
    email: string;
    password: string
}

const initFormData: FormLogin = {
    email: "",
    password: ""
}


function Login() {
    useNotAuthen();

    const [userInfo] = useGlobalState('currentUser')
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState(initFormData)
    function onChange(key) {
        return (e) => {
            const value = e.target.value
            setFormData({
                ...formData,
                [key]: value
            })
        }
    }

    // const onChange = (key: string) => (evt: any) => {
    //     const value = evt.tarvet.value;
    //     setFormData({
    //         ...formData,
    //         [key]: value
    //     })
    // }
    const router = useRouter()
    const errorString = router.query.error
    // console.log(errorString);

    useEffect(() => {
        if (errorString) {
            alert("đăng nhập thất bại")
            window.history.pushState({}, document.title, "/login")
        }
    }, [errorString])


    const handleSubmit = (evt) => {
        evt.preventDefault()
        const body = JSON.stringify(formData)
        const method = "POST"
        fetch("api/login", {
            body,
            method,
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data.token);
                Router.push("/")
                // Cookies.set('token', data.token, { expires: 2 })
            })
    }



    function handleSubmitForm(e) {
        e.preventDefault()
        if (loading === true) return true
        const formElement = e.target

        formElement.submit()

    }

    return (
        <div className="ass1-login">
            <div className="ass1-login__logo">
                <a href="index.html" className="ass1-logo">ZendVn Meme</a>
            </div>
            <div className="ass1-login__content">
                <p>Đăng nhập</p>
                <div className="ass1-login__form">
                    <form action="/api/login" method="POST" onSubmit={handleSubmitForm}>
                        <input
                            // value={formData.email}
                            // onChange={onChange('email')}
                            name="email"
                            type="text" className="form-control" placeholder="Email" required />
                        <div className="ass1-input-copy">
                            <input
                                // value={formData.password}
                                // onChange={onChange('password')}
                                name="password"
                                type="password" className="form-control" placeholder="Mật khẩu" required />
                        </div>
                        <div className="ass1-login__send">
                            <Link href="/register">
                                <a>Đăng ký một tài khoản</a>
                            </Link>
                            <Button type="submit" className="ass1-btn" isLoading={loading} >
                                Đăng nhập
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )

}
export default Login