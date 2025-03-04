import "./search-bar.css";
import SearchIcon from "../../assets/icons/search-icon.svg";
import React from "react";

interface SearchBarProps {
  placeholder: string;
  onSearch?: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onSearch }) => {
  const [inputValue, setInputValue] = React.useState("");

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && onSearch) {
      onSearch((event.target as HTMLInputElement).value);
    }
  };

  const handleBlur = () => {
    if (onSearch) {
      onSearch(inputValue);
    }
  };

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
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={handleKeyPress}
          onBlur={handleBlur}
        />
      </div>
    </>
  );
};

export default SearchBar;
