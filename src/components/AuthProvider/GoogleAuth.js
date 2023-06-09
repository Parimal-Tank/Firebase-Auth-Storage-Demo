import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../../context/AuthContext";
const provider = new GoogleAuthProvider();

const GoogleAuth = () => {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div>
      <button className="google-btn">
        <div className="google-icon-wrapper">
          <img
            alt="Google icon"
            className="google-icon"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          />
        </div>
        Sign in with google
        {/* <p className="btn-text">
          <b></b>
        </p> */}
      </button>
    </div>
  );
};

export default GoogleAuth;
