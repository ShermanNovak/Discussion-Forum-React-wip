import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={classes.control}>
          {props.haslabel && <label htmlFor={props.id}>{props.label}</label>}
          <input 
            type={props.type} 
          >
          </input>
          {props.children}
    </div>

  );
};

export default Input;
