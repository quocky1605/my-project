import React from "react"
import Link from "next/link"

import { PostType } from "../../pages/index"
import { useGlobalState } from "../../state"
import { PostItems } from "../PostItems"
type PropsType = {
    userPosts: PostType[]
}


const HomeSidebar: React.FC<PropsType> = ({ userPosts }) => {
    // console.log("userPost", userPosts);
    const [userInfo] = useGlobalState('currentUser')
    function renderUserPost() {
        if (userPosts.length === 0) {
            return <p> Bạn chưa đăng bài viết nào cả, truy cập <Link href="/post/create">Link này</Link> để đăng bài viết đầu tiên</p>
        } else {

            return userPosts.map((userPost) => <PostItems key={userPost.PID} post={userPost} />)
        }
    }
    return (
        <aside className="ass1-aside">
            <div className="ass1-content-head__t">
                <div>Bài viết gần đây của bạn.</div>
            </div>
            {userInfo
                ? renderUserPost()
                : <div>Vui lòng đăng nhập để xem nội dung này
                    <Link href="/login">
                        <a >Đăng nhập</a>
                    </Link>
                </div>
            }

        </aside>
    )
}
export default HomeSidebar