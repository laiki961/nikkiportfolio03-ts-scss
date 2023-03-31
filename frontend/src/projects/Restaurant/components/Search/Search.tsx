import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import { fetchMealByName } from "../../Store/mealSlice";
import useInput from "../../../../hooks/use-input";

const Search: React.FC<{
  className: string;
  onClick: (name: string) => void;
}> = (props) => {
  const dispatch = useAppDispatch();

  const {
    value: searchValue,
    isValid: enteredSearchValueIsValid,
    valueChangeHandler: searchValueChangehandler,
    inputBlurHandler: searchInputBlurHandler,
    reset: resetSearchInput,
  } = useInput((value: string) => value.trim() !== "");

  const searchNameHandler = (e: React.FormEvent) => {
    e.preventDefault();
    resetSearchInput();
    props.onClick(searchValue);
  };

  let formIsValid = false;
  if (enteredSearchValueIsValid) {
    formIsValid = true;
  }

  return (
    <div className={`${props.className}`}>
      <form onSubmit={searchNameHandler}>
        <input
          type='text'
          className='input'
          onChange={searchValueChangehandler}
          onBlur={searchInputBlurHandler}
          value={searchValue}
        ></input>
        <button type='submit'>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
    </div>
  );
};

export default Search;
