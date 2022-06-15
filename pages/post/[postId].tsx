




import { GetServerSideProps, InferGetServerSidePropsType, NextPageContext } from "next"
import { PostType } from ".."
import { HomeSidebar } from "../../components/HomeSidebar"
import { PostDetailContent } from "../../components/PostDetailContent"
import { getTokenSSRandCSS } from "../../helpers"
import postsServices from "../../services/postsServices"


export type TypeCategory = {
    TAG_ID: string,
    PID: string,
    tag_index: string,
    tag_value: string
}
type PostDetailDataProps = {
    userPosts: PostType[],
    postDetail: PostType,
    postCategories: TypeCategory[]
}

type PostDetailProps = React.FC<InferGetServerSidePropsType<typeof getServerSideProps>>;

const PostDetail: PostDetailProps = ({ userPosts, postDetail, postCategories }) => {

    return (
        <div>
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <PostDetailContent
                                postDetail={postDetail}
                                postCategories={postCategories}
                            />
                        </div>
                        <div className="col-lg-4">
                            <HomeSidebar
                                userPosts={userPosts}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export const getServerSideProps: GetServerSideProps<PostDetailDataProps> = async (context) => {

    const ctx = context as NextPageContext;
    const [token, userToken] = getTokenSSRandCSS(ctx)
    const userid = userToken?.id
    const postId = ctx.query?.postId


    const postDetailPos = postsServices.getPostByPostId({ postId, token })
    const userPostsPos = postsServices.getPostByUserId({ userid, token })
    const [userPostsRes, postDetailRes] = await Promise.all([userPostsPos, postDetailPos])



    // console.log(listPostsRes);
    // console.log(postDetailRes);

    const props = {
        userPosts: userPostsRes?.posts || [],
        postCategories: postDetailRes?.data?.categories || [],
        postDetail: postDetailRes?.data?.post || null
    }

    return {
        props, // will be passed to the page component as props
    }
}
export default PostDetail