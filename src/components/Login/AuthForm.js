import { useState, useContext, Fragment } from "react";
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
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import classes from "./AuthForm.module.css";

const AuthForm = (props) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const auth = getAuth();

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

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim().length > 0);

  const {
    value: enteredFile,
    isValid: enteredFileIsValid,
    hasError: fileInputHasError,
    valueChangeHandler: fileChangeHandler,
    inputBlurHandler: fileBlurHandler,
    reset: resetFileInput,
  } = useInput((value) => value !== undefined);

  let formIsValid = false;

  if (
    enteredEmailIsValid &&
    enteredPasswordIsValid &&
    enteredNameIsValid &&
    enteredFileIsValid
  ) {
    formIsValid = true;
  }

  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    if (!enteredEmailIsValid || !enteredPasswordIsValid) {
      return;
    }

    setIsLoading(true);

    if (isLogin) {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        enteredEmail,
        enteredPassword
      );
      console.log(userCredential);
      authCtx.login(
        userCredential["_tokenResponse"]["idToken"],
        userCredential["_tokenResponse"]["expiresIn"]
      );
    } else {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        enteredEmail,
        enteredPassword
      );
      console.log(userCredential);
      authCtx.login(
        userCredential["_tokenResponse"]["idToken"],
        userCredential["_tokenResponse"]["expiresIn"]
      );

      await updateProfile(auth.currentUser, {
        displayName: enteredName,
      });
    }

    navigate("/COR2100/1");

    resetNameInput();
    resetEmailInput();
    resetPasswordInput();
    resetFileInput();
  };

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="col-lg-5 col-md-6 col-12 p-5">
          {isLoading && (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          <h1>{isLogin ? "Welcome Back" : "Create an Account"}</h1>
          <p>Continue with Google or enter your details</p>

          <form onSubmit={formSubmissionHandler}>
            {!isLogin && (
              <div className="form-floating has-validation my-2">
                <input
                  type="text"
                  className={`form-control ${
                    nameInputHasError ? "is-invalid" : ""
                  }`}
                  id="floatingName"
                  onChange={nameChangeHandler}
                  onBlur={nameBlurHandler}
                  value={enteredName}
                  placeholder="tom@gmail.com"
                  required
                />
                <label htmlFor="floatingName">Name</label>
              </div>
            )}

            {nameInputHasError && (
              <p className="invalid-feedback d-block">
                Please enter your full name.
              </p>
            )}

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

            {!isLogin && (
              <Fragment>
                <hr />
                <span>Profile Picture</span>
                <div className="input-group has-validation my-2">
                  <input
                    type="file"
                    className={`form-control ${
                      fileInputHasError ? "is-invalid" : ""
                    }`}
                    id="floatingFile"
                    onChange={fileChangeHandler}
                    onBlur={fileBlurHandler}
                    value={enteredFile}
                    placeholder="www.google.com"
                    required
                  />
                </div>
              </Fragment>
            )}

            {fileInputHasError && (
              <p className="invalid-feedback d-block">
                Please submit a profile picture.
              </p>
            )}
            <div>
              <button
                type="submit"
                className="btn w-100 my-2"
                disabled={!formIsValid}
              >
                {isLogin ? "Login" : "Create Account"}
              </button>
              <span className="p-0 my-2" onClick={toggleAuthModeHandler}>
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <b>{isLogin ? "Sign up" : "Login"}</b>
              </span>
            </div>
          </form>
        </div>
        <div className={`col-lg-7 col-md-6 col-12 ${classes.gradient}`}>
          Test
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
