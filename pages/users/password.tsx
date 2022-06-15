
import { useRouter } from "next/router"
import { useState } from "react"
import { useAuthen } from "../../helpers/useAuthentication"
import userServices from "../../services/userServices"
import { useGlobalState } from "../../state"

const initState = {
    oldPassword: "",
    newPassword: "",
    reNewPassword: ""
}

const UserChangePassword = () => {
    useAuthen()
    const [formData, setFormData] = useState(initState)
    const [token] = useGlobalState("token")
    const handleOnChange = (key: string) => (e: any) => {
        const value = e.target.value
        setFormData({
            ...formData,
            [key]: value,
        })
    }

    const route = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault()
        userServices
            .changePassword(formData, token)
            .then(res => {
                if (res.status === 200) {
                    alert("thay đổi mật khẩu thành công")
                    setFormData(initState)
                } else {
                    alert(res.error)
                    setFormData(initState)
                }
            }
            )

    }
    return (
        <div className="ass1-login">
            <div className="ass1-login__content">
                <p>Đổi mật khẩu</p>
                <div className="ass1-login__form">
                    <form action="#" onSubmit={handleSubmit}>
                        <input
                            value={formData.oldPassword}
                            onChange={handleOnChange("oldPassword")}
                            type="password" className="form-control" placeholder="Mật khẩu cũ" required />
                        <input
                            value={formData.newPassword}
                            onChange={handleOnChange("newPassword")}
                            type="password" className="form-control" placeholder="Mật khẩu mới" required />
                        <input
                            value={formData.reNewPassword}
                            onChange={handleOnChange("reNewPassword")}
                            type="password" className="form-control" placeholder="Xác nhận mật khẩu mới" required />
                        <div className="ass1-login__send justify-content-center">
                            <button type="submit" className="ass1-btn">Gửi</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
export default UserChangePassword