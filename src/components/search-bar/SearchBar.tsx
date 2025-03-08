import "./search-bar.css";
import SearchIcon from "../../assets/icons/search-icon.svg";
import React from "react";

interface SearchBarProps {
  placeholder: string;
  defaultInput?: string;
  onSearch?: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, defaultInput, onSearch }) => {
  const [inputValue, setInputValue] = React.useState(defaultInput || "");

  React.useEffect(() => {
    if (defaultInput !== undefined) {
      setInputValue(defaultInput);
    }
  }, [defaultInput]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (onSearch) {
      onSearch(event.target.value);
    }
  };

  return (
    <div className="search-bar-container">
      <label htmlFor={`search-bar-${placeholder}`}>
        <img src={SearchIcon} alt="search icon" />
      </label>

      <input
        id={`search-bar-${placeholder}`}
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
