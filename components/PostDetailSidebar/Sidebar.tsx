import { useGlobalState } from "../../state"


type PropsType = {
    category: string[],
    handleSubmitPost: () => void,
    onChangeDetailForm: (key: string, value: any) => void
}


const PostForm: React.FC<PropsType> = ({ category, onChangeDetailForm, handleSubmitPost }) => {

    ///Biến
    const [listCategories] = useGlobalState('categories')

    ///Hàm
    const handleOnChange = (e: any) => {
        const isChecked = e.target.checked
        const value = e.target.value
        const findId = category.findIndex(cateID => cateID === value)
        const isExist = findId !== -1
        if (!isExist && isChecked) {
            onChangeDetailForm("category", [...category, value])
        } else if (!isChecked) {
            onChangeDetailForm("category", category.filter(id => id !== value))
        }
        console.log(value, isChecked)
    }



    return (
        <aside className="ass1-aside ass1-aside__edit-post">
            <div>
                <button onClick={handleSubmitPost} className="ass1-btn">Đăng bài</button>
            </div>
            <div className="ass1-aside__edit-post-head">
                <span style={{ display: 'block', width: '100%', marginBottom: '10px' }}>Chọn danh mục</span>
                {listCategories.map(category => {
                    return (
                        <label key={category.id} className="ass1-checkbox">
                            <input
                                type="checkbox"
                                name="state-post"
                                value={category.id}
                                onChange={handleOnChange}
                            />
                            <span />
                            <p>{category.text}</p>
                        </label>
                    )
                })}


            </div>
            <div className="ass1-aside__get-code">
                <p>Share Link</p>
            </div>
            <div className="ass1-aside__social">
                <a href="" className="ass1-btn-social__facebook ass1-btn-social"><i className="fa fa-facebook" aria-hidden="true" /></a>
                <a href="" className="ass1-btn-social__twitter ass1-btn-social"><i className="fa fa-twitter" aria-hidden="true" /></a>
                <a href="" className="ass1-btn-social__google ass1-btn-social"><i className="fa fa-google-plus" aria-hidden="true" /></a>
            </div>
        </aside>
    )
}

export default PostForm