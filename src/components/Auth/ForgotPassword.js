import React from "react";
import { FirebaseContext } from '../../firebase/';
function ForgotPassword() {
  const { firebase } = React.useContext(FirebaseContext);
  const [resetPasswordEmail, setRestPasswordEmail] = React.useState('');
  const [isPasswordReset, setIsPasswordReset] = React.useState(false);
  const [passwordRestError, setPasswordResetError] = React.useState(null);

  async function handleRestPassword() {
    try {
      await firebase.resetPassword(resetPasswordEmail)
      setIsPasswordReset(true)
      setPasswordResetError(null);
    } catch(error) {
      console.error(error);
      setPasswordResetError(error.message);
      setIsPasswordReset(false)
    }
  }
  return (
    <div>
      <input
        type="email"
        className="input"
        placeholder="Provide your account email"
        onChange={event => setRestPasswordEmail(event.target.value)}
       />
      <div>
        <button className="button" onClick={handleRestPassword}>
          Reset Password
        </button>
      </div>
      {isPasswordReset && (
        <p>Check email to reset password</p>
      )}
      {passwordRestError && (
        <p className="error-text">{passwordRestError}</p>
      )}
    </div>
  );
}

export default ForgotPassword;
