import PropTypes from "prop-types";
import { useRef } from "react";
import { useKey } from "../hooks/useKey";

function Search({ query, setQuery }) {
  const inputEl = useRef(null); // 创建了一个可变的对象 { current: null }，即 inputEl.current 一开始是 null。

  function handleFreshSearch() {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  }
  useKey("Enter", handleFreshSearch);

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
