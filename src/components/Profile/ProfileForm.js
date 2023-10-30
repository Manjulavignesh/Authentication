import classes from "./ProfileForm.module.css";
import { useRef } from "react";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";

const ProfileForm = () => {
  const passwordInput = useRef();
  const authCtx = useContext(AuthContext);
  const submitEventHandler = (e) => {
    e.preventDefault();
    const enteredPassword = passwordInput.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAv3hGFYf7AQ-OpkIHdzxRyIAGNtlq1m7k",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredPassword,
          returnSecureToken: false,
        }),
        heders: { "content-type": "application/json" },
      }
    );
  };
  return (
    <form className={classes.form} onSubmit={submitEventHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={passwordInput} minLength={7} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
