import "./search-bar.css";
import SearchIcon from "../../assets/icons/search-icon.svg";

interface SearchBarProps {
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder }) => {
  return (
    <>
      <div className="search-bar-container">
        <label htmlFor={`search-bar-${placeholder}`}>
          <img src={SearchIcon} alt="search icon" />
        </label>

        <input
          id={`search-bar-${placeholder}`}
          type="text"
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default SearchBar;
