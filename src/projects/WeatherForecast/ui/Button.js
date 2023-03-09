import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <div className={classes.clearfix}>
      <button
        className={classes.button}
        type={props.type || "button"}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </div>
  );
};

export default Button;
