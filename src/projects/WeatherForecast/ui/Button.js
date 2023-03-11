const Button = (props) => {
  return (
    <div className='clearfix'>
      <button
        className='button weather__button'
        type={props.type || "button"}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </div>
  );
};

export default Button;
