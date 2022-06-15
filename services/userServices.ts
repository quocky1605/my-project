import api from "./api";
type DataRegister = {
    fullname: string,
    email: string,
    password: string,
    repassword: string
}

type PasswordData = {
    oldPassword: string,
    newPassword: string,
    reNewPassword: string
}
type ProfileData = {
    avatar: File | null,
    fullname: string,
    description: string,
    gender: string
}
const userServices = {
    getUserById: async (userId: string) => {
        return api.callJson(`/member/member.php?userid=${userId}`)
    },
    registerUser: async (data: DataRegister) => {
        return api.callJson(`/member/register.php`, {
            data,
            method: "POST"
        })
    },
    changePassword: async (data: PasswordData, token: string) => {
        return api.callJson("/member/password.php", {
            data,
            token,
            method: "POST"
        })
    },
    updateProfile: async (profileData: ProfileData, token: string) => {
        const data = new FormData()
        data.append("fullname", profileData.fullname)
        data.append("description", profileData.description)
        data.append("gender", profileData.gender)
        data.append("fullname", profileData.fullname)
        if (profileData.avatar) {
            data.append("avatar", profileData.avatar)
        }
        return api.callFormData(`/member/update.php`, {
            data, token
        })
    }
}

export default userServices