import Link from "next/link"
import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'
import viLocal from 'dayjs/locale/vi'
import { PostType } from "../../pages/index"
import { hightlightText } from "../../helpers"


type PropsType = {
    post: PostType
    customApp?: string | ""
    isHightLight?: boolean
    queryStr?: string
}


dayjs.extend(relativeTime)
const PostItems: React.FC<PropsType> = ({ post, customApp, isHightLight, queryStr }) => {

    const timeFormat = dayjs(post?.time_added).locale(viLocal).fromNow()
    // console.log(timeFormat);
    let className = "ass1-section__item"
    if (customApp) {
        className = className + " " + customApp
    }


    const renderFullname = () => {
        if (isHightLight && queryStr) {
            return hightlightText(post?.fullname, queryStr)
        }
        return post?.fullname
    }

    const renderPostContent = () => {
        if (isHightLight && queryStr) {
            return hightlightText(post.post_content, queryStr)
        }
        return post.post_content
    }
    if (!post) return null
    return (
        <div className={className}>
            <div className="ass1-section">
                <div className="ass1-section__head">
                    <Link href="/users/[userId]" as={`/users/${post.USERID}`}>
                        <a className="ass1-section__avatar ass1-avatar">
                            <img src={post.profilepicture || "/images/avatar-04.png"} alt={post.USERID} />
                        </a>
                    </Link>
                    <div>
                        <Link href="/users/[userId]" as={`/users/${post.USERID}`}>
                            <a
                                className="ass1-section__name"
                                dangerouslySetInnerHTML={{ __html: renderFullname() }}
                            />
                        </Link>
                        <span className="ass1-section__passed">{timeFormat}</span>
                    </div>
                </div>
                <div className="ass1-section__content">
                    <p dangerouslySetInnerHTML={{ __html: renderPostContent() }} />
                    <div className="ass1-section__image">
                        <Link href="/post/[postId]" as={`/post/${post.PID}`}>
                            <a>
                                <img src={post.url_image} alt={post.url_image} />
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="ass1-section__footer">
                    <Link href="/post/[postId]" as={`/post/${post.PID}`}>
                        <a className="ass1-section__btn-comment ass1-btn-icon">
                            <i className="icon-Comment_Full" />
                            <span>{[post.count]}</span>
                        </a>
                    </Link>

                </div>
            </div>
        </div>

    )
}
export default PostItems