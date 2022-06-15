import Masonry from "react-masonry-component"
import { PostType } from "../../pages"
import { PostItems } from "../PostItems"

type PropsType = {
    userDetailPosts: PostType[]
}

const UserDetailPost: React.FC<PropsType> = ({ userDetailPosts }) => {
    return (

        <Masonry
            className="ass1-section__wrap row ass1-section__isotope-init" // default ''
        >
            {
                userDetailPosts.map((post) => <PostItems key={post.PID} post={post} customApp={`col-lg-6`} />)
            }
        </Masonry>

    )
}

export default UserDetailPost