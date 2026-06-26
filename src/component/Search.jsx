import { FaSearch } from "react-icons/fa";

const Search = ({ searchKey, setSearchKey }) => {
  return (
    <div className="user-search-area">
      <input
        type="text"
        className="user-search-text"
        placeholder="Search user..."
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
      />
      <FaSearch className="search-icon" />
    </div>
  );
};

export default Search;
