import { useRouter } from "next/router"
import { useEffect, useMemo } from "react"
import { NextPage, NextPageContext } from "next"
import { PostType } from "../index"
import postsServices from "../../services/postsServices"

import Masonry from 'react-masonry-component';
import { PostItems } from "../../components/PostItems"
import { useGlobalState } from "../../state"


type PropsType = {
    listPosts: PostType[]
}


const SearchPage: NextPage<PropsType> = ({ listPosts }) => {

    // console.log(listPosts)
    const [categories] = useGlobalState("categories")

    const router = useRouter()
    const categoriesId = (router.query.cateId || "")
    useEffect(() => {
        if (categoriesId === "") {
            router.push("/")
        }
    }, [categoriesId]);


    const findText = useMemo(() => {
        const findOb = categories.find((o) => o.id === Number(categoriesId))
        return findOb?.text || ""
    }, [categoriesId, categories])
    return (
        <div className="container">
            <div className="header-search" style={{ padding: "30px 0" }}>
                <h3>Từ khóa tìm kiếm: <strong>{findText}</strong></h3>
                <p>Tìm kiếm được ({listPosts.length} kết quả</p>
            </div>

            <Masonry
                className="ass1-section__wrap row ass1-section__isotope-init" // default ''
            >
                {
                    listPosts.map((post) => <PostItems key={post.PID} post={post} customApp={`col-lg-6`} />)
                }
            </Masonry>
        </div>
    )
}


SearchPage.getInitialProps = async (ctx: NextPageContext) => {

    const tagIndex = ctx.query.cateId as string
    const listPostsRes = await postsServices.getPostsPaggingByCategories({ tagIndex })

    return {
        listPosts: listPostsRes?.posts || []
    }
}

export default SearchPage