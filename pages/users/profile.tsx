import { useGlobalState } from "../../state"
import { useState, useRef } from "react"

import userServices from "../../services/userServices"

const UserProfile = () => {
    const [token] = useGlobalState("token")
    const [currentUser, setCurrentUser] = useGlobalState("currentUser")
    const inputeElement = useRef(null)
    const [user, setUser] = useState(currentUser)

    const [objFile, setObjFile] = useState({
        file: null,
        base64URL: ""
    })

    const handleOnChange = (key: string) => (e: any) => {
        const value = e.target.value
        if (user) {
            setUser({
                ...user,
                [key]: value
            })
        }

    }
    const handleSelectFile = () => {

        inputeElement.current.click()
    }


    const handleChangeFile = (e: any) => {
        const listFiles = e.target.files
        if (listFiles.length === 0) return;
        const file = listFiles[0] as File

        if (/\/(jpe?g|png|gif|bmp)$/i.test(file.type)) {
            const reader = new FileReader()
            reader.addEventListener("load", function () {
                setObjFile({
                    file: file,
                    base64URL: reader.result as string
                })
            }, false);
            reader.readAsDataURL(file);
        } else {
            alert("file không hợp lệ")
        }
    }

    const avatarURL = objFile.base64URL || user?.profilepicture || "/images/avatar-02.png"

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const data = {
            fullname: user?.fullname,
            gender: user?.gender,
            description: user?.description,
            avatar: objFile.file
        }
        userServices
            .updateProfile(data, token as string)
            .then(res => {
                if (res.status === 200) {
                    setCurrentUser(res.user)
                    alert("Update thành công")
                } else {
                    alert(res.error)
                }
            })
    }
    return (
        <div className="ass1-login">
            <div className="ass1-login__content">
                <p>Profile</p>
                <div className="ass1-login__form">
                    <div className="avatar" style={{ cursor: "pointer" }} onClick={handleSelectFile}>
                        <img
                            src={avatarURL}
                            alt=""
                        />
                    </div>
                    <form action="#" onSubmit={handleSubmit}>
                        <input
                            onChange={handleOnChange("fullname")}
                            value={user?.fullname}
                            type="text"
                            className="form-control"
                            placeholder="...Tên"
                            required />
                        <select
                            value={user?.gender}
                            onChange={handleOnChange("gender")}
                            className="form-control">
                            <option >Giới tính</option>
                            <option value="nam">Nam</option>
                            <option value="nữ">Nữ</option>
                        </select>
                        <input
                            onChange={handleChangeFile}
                            ref={inputeElement}
                            style={{ display: "none" }}
                            type="file"
                            name="avatar"
                            placeholder="Ảnh đại diện"
                            className="form-control"
                        />
                        <textarea
                            onChange={handleOnChange("description")}
                            value={user?.description}
                            className="form-control"
                            cols={30} rows={5}
                            placeholder="Mô tả ngắn ..."
                        // defaultValue={""}
                        />
                        <div className="ass1-login__send justify-content-center">
                            <button type="submit" className="ass1-btn">Cập nhật</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
export default UserProfile