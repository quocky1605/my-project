




import { useState } from "react"
import { PostForm } from "../../components/PostDetailForm"
import { PostSidebar } from "../../components/PostDetailSidebar"
import { useAuthen } from "../../helpers/useAuthentication"
import postsServices from "../../services/postsServices"
import { useGlobalState } from "../../state"



const initState = {

    url_image: "",
    post_content: "",
    category: [],
    obj_image: {
        file: null,
        base64: ""
    }
}
function PostCreate() {
    useAuthen()
    const [postData, setPostData] = useState(initState)
    const [token] = useGlobalState('token')
    // const onChangeCategory = (newCategory: string[]) => {
    //     setPostData({
    //         ...postData,
    //         category: newCategory
    //     })

    // }
    const onChangeDetailForm = (key: string, value: any) => {
        // console.log(key, value)
        setPostData({
            ...postData,
            [key]: value
        })
    }

    const handleSubmitPost = () => {
        postsServices
            .createNewPost(postData, token as string)
            .then(res => {
                if (res.status === 200) {
                    alert("Upload bài viết thành công")
                } else if (res.status === 200) {
                    alert("bạn không được bỏ trống trường này")
                }
            })
    }
    console.log(postData.category)
    return (
        <div>
            <div className="container">
                {/*sections*/}
                <div className="row">
                    <div className="col-lg-8">
                        {/*section*/}
                        <PostForm
                            url_image={postData.url_image}
                            post_content={postData.post_content}
                            obj_image={postData.obj_image}
                            onChangeDetailForm={onChangeDetailForm}
                        />
                    </div>
                    <div className="col-lg-4">
                        <PostSidebar
                            onChangeDetailForm={onChangeDetailForm}
                            category={postData.category}
                            handleSubmitPost={handleSubmitPost}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostCreate