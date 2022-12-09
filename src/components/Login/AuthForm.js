import { Fragment, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// home page
// to make it less ugly and change the input bg color
// to add logout button
// to add loading spinner
// to set up routing and history
// to set up localstorage
// isLoading

import Card from "../UI/Card";
import Button from "../UI/Button";
import useInput from "../../hooks/use-input";
import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./AuthForm.module.css";

let API_KEY = "AIzaSyB18YrDwB_Wzo7HnCGjcEhvh9H3fpxFl1U";

const AuthForm = (props) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const toggleAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@") && value.includes(".com"));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim().length >= 8);

  let formIsValid = false;

  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!enteredEmailIsValid || !enteredPasswordIsValid) {
      return;
    }

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
        API_KEY;
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
        API_KEY;
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => {
        setIsLoading(false);
        if (result.ok) {
          console.log(result);
          return result.json();
        } else {
          return result.json().then((data) => {
            console.log(data);
            throw new Error(data.error.message);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, expirationTime.toISOString());
        navigate("/IS112");
      })
      .catch((err) => {
        alert(err.message);
      });

      resetEmailInput();
      resetPasswordInput();
  };

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      <Card className={classes.card_form}>
        <div className={classes.title}>{isLogin ? "Login" : "Sign Up"}</div>

        <form onSubmit={formSubmissionHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              value={enteredEmail}
              required
            />
          </div>

          {emailInputHasError && <p>Please enter a valid email address.</p>}
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              value={enteredPassword}
              required
            />
          </div>
          {passwordInputHasError && (
            <p>Password must be at least 8 characters long.</p>
          )}
          <div className={classes.actions}>
            <Button disabled={!formIsValid}>
              {isLogin ? "Login" : "Create Account"}
            </Button>
            <Button className={classes.toggle} onClick={toggleAuthModeHandler}>
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Login"}
            </Button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default AuthForm;
