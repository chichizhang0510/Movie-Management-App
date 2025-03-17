import PropTypes from "prop-types";
import { useRef, useEffect } from "react";

function Search({ query, setQuery }) {
  const inputEl = useRef(null); // 创建了一个可变的对象 { current: null }，即 inputEl.current 一开始是 null。

  useEffect(() => {
    function callback(e) {
      if (document.activeElement === inputEl.current) return;

      if (e.code === "Enter") {
        inputEl.current.focus();
        setQuery("");
      }
    }
    document.addEventListener("keydown", callback);
    return () => document.removeEventListener("keydown", callback);
  }, [setQuery]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl} // ref={inputEl} 让 useRef 绑定到 DOM 元素，这是 React 赋值 ref 的默认行为。
    />
  );
}

Search.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
};

export default Search;
