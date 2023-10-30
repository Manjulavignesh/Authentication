import { useState, useRef,useContext } from "react";
import { useHistory } from "react-router-dom";
import classes from "./AuthForm.module.css";
import AuthContext from "../../store/auth-context";


const AuthForm = () => {
  const history=useHistory();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  
  const emailInput = useRef();
  const passwordInput = useRef();
  const authCtx=useContext(AuthContext)
  const submitHandler = (e) => {
    setisLoading(true);
    e.preventDefault();
    const enteredEmail = emailInput.current.value;
    const enteredPassword = passwordInput.current.value;
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAv3hGFYf7AQ-OpkIHdzxRyIAGNtlq1m7k";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAv3hGFYf7AQ-OpkIHdzxRyIAGNtlq1m7k";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: { "content-type": "application/json" },
    }).then((res) => {
      setisLoading(false);
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then((data) => {
          let errorMessage = "Authentication Failed";
          throw new Error(errorMessage)
          
        });
      }
      
    }).then((data)=>{authCtx.login(data.idToken);history.replace("/profile")}).catch((err)=>{alert(err.message);})
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInput} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordInput} />
        </div>
        <div className={classes.actions}>
          {!isLoading  && (
            <button >{isLogin ? "Login" : "Create Account "}</button>
          )}
          {isLoading && <p>Sending Request.....</p>}
        </div>
        <div className={classes.actions}>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
