import React from "react";
import "../../../App.scss";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={`control ${props.isValid === false ? "invalid" : ""}`}>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        placeholder='Please enter a city'
      />
    </div>
  );
});

export default Input;
