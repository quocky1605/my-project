import { NextPage, NextPageContext } from "next";
import { UserDetailInfo } from "../../components/UserDetailInfo";
import { UserDetailPost } from "../../components/UserDetailPost";
import { TypeUser } from "../../state";
import { PostType } from "..";
import { getTokenSSRandCSS } from "../../helpers";
import postsServices from "../../services/postsServices";
import userServices from "../../services/userServices";
import { useAuthen } from "../../helpers/useAuthentication";
import { useEffect } from "react";
import { useRouter } from "next/router";


type PropsType = {
    userDetailInfo: TypeUser,
    userDetailPosts: PostType[]
}


const UserDetail: NextPage<PropsType> = ({ userDetailInfo, userDetailPosts }) => {
    useAuthen()
    const route = useRouter()
    useEffect(() => {
        if (!userDetailInfo) {
            alert("User không tồn tại")
            route.push("/")
        }
    }, [])
    return (
        <div className="container">
            <UserDetailInfo
                postCount={userDetailPosts.length}
                userDetailInfo={userDetailInfo}
            />


            <UserDetailPost
                userDetailPosts={userDetailPosts}
            />
        </div>
    )
}

UserDetail.getInitialProps = async (ctx: NextPageContext) => {
    const [token, userToken] = getTokenSSRandCSS(ctx)
    const userid = ctx.query?.userId as string

    const userPos = userServices.getUserById(userid)

    const postPos = postsServices.getPostByUserId({ userid, token })
    const [userRes, postRes] = await Promise.all([userPos, postPos])
    return {
        userDetailInfo: userRes.user || null,
        userDetailPosts: postRes?.posts || []
    }

}

export default UserDetail