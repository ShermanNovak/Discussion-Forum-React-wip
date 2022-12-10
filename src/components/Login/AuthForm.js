import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// home page
// to make it less ugly and change the input bg color
// to add logout button
// to add loading spinner
// to set up routing and history
// to set up localstorage
// isLoading

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
    resetEmailInput();
    resetPasswordInput();
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
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="col-lg-5 col-md-6 col-12 p-5">
          {isLoading && <LoadingSpinner />}
          <h1>{isLogin ? "Welcome Back" : "Create an Account"}</h1>
          <p>Continue with Google or enter your details</p>

          <form onSubmit={formSubmissionHandler}>
            <div className="form-floating has-validation my-2">
              <input
                type="email"
                className={`form-control ${
                  emailInputHasError ? "is-invalid" : ""
                }`}
                id="floatingEmail"
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                value={enteredEmail}
                placeholder="test@gmail.com"
                required
              />
              <label htmlFor="floatingEmail">Email</label>
            </div>

            {emailInputHasError && (
              <p className="invalid-feedback d-block">
                Please enter a valid email address.
              </p>
            )}

            <div className="form-floating my-2">
              <input
                type="password"
                className={`form-control ${
                  passwordInputHasError ? "is-invalid" : ""
                }`}
                id="floatingPassword"
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                value={enteredPassword}
                placeholder="password"
                required
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            {passwordInputHasError && (
              <p className="invalid-feedback d-block">
                Password must be at least 8 characters long.
              </p>
            )}
            <div>
              <button
                type="submit"
                className={`btn w-100 my-2 ${classes.authbtn}`}
                disabled={!formIsValid}
              >
                {isLogin ? "Login" : "Create Account"}
              </button>
              <button
                type="button"
                className="btn p-0 my-2"
                onClick={toggleAuthModeHandler}
              >
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <b>{isLogin ? "Sign up" : "Login"}</b>
              </button>
            </div>
          </form>
        </div>
        <div className={`col-lg-7 col-md-6 col-12 ${classes.gradient}`}>Test</div>
      </div>
    </div>
  );
};

export default AuthForm;
