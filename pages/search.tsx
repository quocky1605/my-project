import { useRouter } from "next/router"
import { useEffect } from "react"
import { NextPage, NextPageContext } from "next"
import { PostType } from "./index"
import postsServices from "../services/postsServices"

import Masonry from 'react-masonry-component';
import { PostItems } from "../components/PostItems"


type PropsType = {
    listPosts: PostType[]
}


const SearchPage: NextPage<PropsType> = ({ listPosts }) => {

    // console.log(listPosts)

    const router = useRouter()
    const searchStr = (router.query.query || "") as string
    useEffect(() => {
        if (!router.isReady) return;
        const query = router.query;
        // console.log(query.query)
    }, [router.isReady, router.query]);

    useEffect(() => {
        if (searchStr === "") {
            router.push("/")
        }
    }, [searchStr])

    return (
        <div className="container">
            <div className="header-search" style={{ padding: "30px 0" }}>
                <h3>Từ khóa tìm kiếm: <strong>{searchStr}</strong></h3>
                <p>Tìm kiếm được ({listPosts.length} kết quả</p>
            </div>

            <Masonry
                className="ass1-section__wrap row ass1-section__isotope-init" // default ''
            >
                {
                    listPosts.map((post) => <PostItems key={post.PID} post={post} customApp={`col-lg-6`} isHightLight={true} queryStr={searchStr} />)
                }
            </Masonry>
        </div>
    )
}



SearchPage.getInitialProps = async (ctx: NextPageContext) => {

    const queryStr = ctx.query.query || ""
    const listPostsRes = await postsServices.getPostsSearch({ queryStr })

    return {
        listPosts: listPostsRes?.posts || []
    }
}

export default SearchPage