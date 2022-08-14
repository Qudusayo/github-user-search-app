import React, { FormEventHandler, RefObject } from "react";
import seacrhIcon from "./../assets/icon-search.svg";

interface SearchInputProps {
  invalidUsername: boolean;
  usernameInputRef: RefObject<HTMLInputElement>;
  usernameSubmitHandler: FormEventHandler<HTMLFormElement>;
}

const SearchInput: React.FC<SearchInputProps> = (props) => {
  return (
    <form className="SearchInput" onSubmit={props.usernameSubmitHandler}>
      <img src={seacrhIcon} alt="icon-search" />
      <input
        placeholder="Search GitHub username…"
        ref={props.usernameInputRef}
      />
      {props.invalidUsername ? <span>No results</span> : null}
      <button>Search</button>
    </form>
  );
};

export default SearchInput;
