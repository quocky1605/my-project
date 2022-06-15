import api from "./api";


type ObjImage = {
    file: File | null,
    base64: string
}
type TypePostCreate = {
    url_image: string,
    post_content: string,
    category: string[],
    obj_image: ObjImage
}
const postsServices = {
    createNewPost: async ({ post_content, url_image, category, obj_image }: TypePostCreate, token: string) => {
        const url = "/post/addNew.php"
        const data = new FormData()
        data.append("post_content", post_content)
        data.append("url_image", url_image)
        data.append("category", category.toString())
        if (obj_image.file) {
            data.append("obj_image", obj_image.file)
        }
        return api.callFormData(url, {
            data, token
        })
    },
    getPostsPagging: async ({ pagesize = 3, currPage = 1 } = {}) => {
        const url = `/post/getListPagination.php?pagesize=${pagesize}&currPage=${currPage}`
        return api.callJson(url)
    },
    getPostByUserId: async ({ userid, token }: any) => {
        if (!userid || !token) {
            return {
                status: 200,
                post: []
            }
        }
        const url = `/post/getListPostUserID.php?userid=${userid}`
        return api.callJson(url, { token })
    },
    getPostsSearch: async ({ queryStr }: any) => {
        return api.callJson(`/post/search.php?query=${encodeURI(queryStr)}`)
    },
    getListCategories: async () => {
        return api.callJson("/categories/index.php")
    },
    getPostsPaggingByCategories: async ({ pagesize = 10, currPage = 1, tagIndex = "" } = {}) => {
        if (tagIndex === "") return null
        const url = `/post/getListByCategory.php?pagesize=${pagesize}&currPage=${currPage}&tagIndex=${tagIndex}`
        return api.callJson(url)
    },
    getPostByPostId: async ({ postId, token }) => {
        const url = `/post/post.php?postid=${postId}`
        if (!postId || !token) {
            return {
                status: 500
            }
        }
        return api.callJson(url, {
            token
        })
    }
}

export default postsServices