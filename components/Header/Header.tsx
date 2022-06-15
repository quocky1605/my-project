
import Link from "next/link";
import { useGlobalState } from "../../state";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { HeaderSearch } from "../HeaderSearch";
import { useEffect } from "react";
import HeaderMenu from "./HeaderMenu";


function Header() {
    const [, setToken] = useGlobalState("token")
    const [userInfo, setUserInfo] = useGlobalState("currentUser")

    const router = useRouter()
    // console.log(userInfo);
    function handleLogout() {

        const check = window.confirm("Bạn có thật sự muốn Logout")
        if (check) {
            Cookies.remove('token')
            setToken("")
            setUserInfo(null)
            router.push("/login")
        }
    }
    return (

        <header>
            <div className="ass1-header">
                <div className="container">
                    <Link href="/">
                        <a className="ass1-logo">
                            ZendVn Meme
                        </a>
                    </Link>
                    <HeaderMenu />
                    <HeaderSearch />
                    <Link href="/post/create">
                        <a className="ass1-header__btn-upload ass1-btn">
                            <i className="icon-Upvote" /> Upload
                        </a>
                    </Link>

                    {/* nếu currentUser có thì show thông tin ẩn login  */}
                    {
                        userInfo
                            ? <div className="wrapper-user">
                                <Link href="/users/[userId]" as={`/users/${userInfo.USERID}`}>
                                    <a className="user-header">
                                        <span className="avatar">
                                            <img src={userInfo.profilepicture || "/images/avatar-02.png"} alt="avatar" />
                                        </span>
                                        <span className="email">{userInfo.email}</span>
                                    </a>

                                </Link>
                                <div className="logout" onClick={handleLogout}>Logout</div>
                            </div>
                            : <Link href="/login">
                                <a className="ass1-header__btn-upload ass1-btn">
                                    Login
                                </a>
                            </Link>
                    }



                </div>
            </div>
        </header>

    );
}


export default Header