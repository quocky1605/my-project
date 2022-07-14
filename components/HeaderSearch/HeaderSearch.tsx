import { useState } from "react";
import { useRouter } from "next/router";
const HeaderSearch = () => {
  const [queryStr, setQueryStr] = useState("");
  const router = useRouter();

  const onChange = (evt: any) => {
    setQueryStr(evt.target.value);
  };
  const onSubmit = (evt: any) => {
    evt.preventDefault();
    if (queryStr) {
      router.push(`/search?query=${queryStr}`);
    }
  };

  return (
    <div className="ass1-header__search">
      <form action="#" onSubmit={onSubmit}>
        <label>
          <input
            value={queryStr}
            onChange={onChange}
            type="search"
            name="search-text"
            className="form-control"
            placeholder="Nhập từ khóa ..."
          />
          <i className="icon-Search" />
        </label>
      </form>
    </div>
  );
};

export default HeaderSearch;
