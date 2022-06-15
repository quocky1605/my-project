

import React, { useState } from "react"
import { PostItems } from "../PostItems"


import { PostType } from "../../pages/index"
import { Button } from "../Button"
import postsServices from "../../services/postsServices"
type PropsType = {
    listPosts: PostType[]
}

const pagesize = 3

const PostList: React.FC<PropsType> = (props) => {
    const [loading, setLoading] = useState(false)
    const [listPosts, setListPosts] = useState(props.listPosts)
    const [currentPage, setCurrentPage] = useState(1)

    const handleLoadPosts = () => {
        setLoading(true)
        if (loading) return true
        postsServices
            .getPostsPagging({ pagesize, currPage: currentPage + 1 })
            .then(res => {
                if (res.status === 200) {
                    const newPostsList = res.posts || [];
                    setListPosts([
                        ...listPosts,
                        ...newPostsList
                    ])
                    setCurrentPage(pre => pre + 1)
                }
            })
            .finally(() => {
                setLoading(false)
            }
            )
    }
    return (
        <div className="ass1-section__list">

            {
                listPosts.map((post) => <PostItems key={post.PID} post={post} />)
            }
            <Button
                isLoading={loading}
                onClick={handleLoadPosts}
                className="load-more ass1-btn"
            >
                Xem thêm
            </Button>
        </div>
    )
}
export default PostList