import Link from "next/link"
import { PostType } from "../../pages"
import { TypeCategory } from "../../pages/post/[postId]"
import { PostCommentsForm } from "../PostCommentsForm"
import { PostCommentsList } from "../PostCommentsList"
import { PostItems } from "../PostItems"

type PropsType = {
    postDetail: PostType,
    postCategories: TypeCategory[]
}

const PostDetailContent: React.FC<PropsType> = ({ postDetail, postCategories }) => {

    return (
        <div className="ass1-section__list">
            <PostItems
                post={postDetail}
            />
            <div>
                <ul>
                    {
                        postCategories.map((cate, key) => {
                            return (
                                <li key={key}>
                                    <Link href="/categories/[cateId]" as={`/categories/${cate.tag_index}`}>
                                        <a>{cate.tag_value}</a>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            {/*comment-form*/}
            <PostCommentsForm />
            {/*comment-list*/}
            <PostCommentsList />

        </div>

    )
}

export default PostDetailContent