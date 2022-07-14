import { useRef } from "react";

type PropsType = {
  url_image: string;
  post_content: string;
  obj_image: {
    file: File | null;
    base64: string;
  };
  onChangeDetailForm: (key: string, value: any) => void;
};

const PostForm: React.FC<PropsType> = ({
  url_image,
  obj_image,
  post_content,
  onChangeDetailForm,
}) => {
  const inputeElement = useRef(null);

  const handleOnChange = (key: string) => (e: any) => {
    const value = e.target.value;
    onChangeDetailForm(key, value);
  };

  const handleSelectFile = () => {
    inputeElement.current.click();
  };

  const handleChangeFile = (e: any) => {
    const listFiles = e.target.files;
    if (listFiles.length === 0) return;
    const file = listFiles[0] as File;

    if (/\/(jpe?g|png|gif|bmp)$/i.test(file.type)) {
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          // setObjFile({
          //     file: file,
          //     base64URL: reader.result as string
          // })
          onChangeDetailForm("obj_image", {
            file,
            base64: reader.result as string,
          });
        },
        false
      );
      reader.readAsDataURL(file);
    } else {
      alert("file không hợp lệ");
    }
  };

  const imageURL =
    url_image || obj_image.base64 || "/images/no_image_available.jpg";

  return (
    <div className="ass1-section ass1-section__edit-post">
      <div className="ass1-section__content">
        <form action="#">
          <div className="form-group">
            <input
              value={url_image}
              onChange={handleOnChange("url_image")}
              type="text"
              className="form-control ttg-border-none"
              placeholder="https://"
            />
          </div>
          <div className="form-group">
            <textarea
              value={post_content}
              onChange={handleOnChange("post_content")}
              className="form-control ttg-border-none"
              placeholder="Mô tả ..."
              defaultValue={""}
            />
          </div>
        </form>
        <input
          onChange={handleChangeFile}
          ref={inputeElement}
          style={{ display: "none" }}
          type="file"
        />
        <div className="ass1-section__image">
          <a href="#">
            <img src={imageURL} alt="default" />
          </a>
        </div>
        <a
          href="https://memeful.com/"
          target="_blank"
          className="ass1-btn ass1-btn-meme"
        >
          Chế ảnh từ meme
        </a>
        <a
          onClick={handleSelectFile}
          style={{ cursor: "pointer" }}
          className="ass1-btn ass1-btn-meme"
        >
          Đăng ảnh từ máy tính
        </a>
      </div>
    </div>
  );
};

export default PostForm;
