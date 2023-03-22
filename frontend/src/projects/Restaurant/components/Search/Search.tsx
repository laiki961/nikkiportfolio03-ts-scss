import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Search: React.FC<{ className: string }> = (props) => {
  return (
    <div className={props.className}>
      <input type='text' className='input'></input>
      <button>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
};

export default Search;
