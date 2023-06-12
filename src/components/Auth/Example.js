import * as React from "react";
import { auth } from "../../firebase/firebaseConfig";
import {
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

// This is Working Fine Wite the Sign with Email
// The Flow is store the email to the in locale storage

export default function SignIn() {
  const navigate = useNavigate();
  // Will try to use previously entered email, defaults to an empty string
  const [email, setEmail] = React.useState(
    window.localStorage.getItem("emailForSignIn") || ""
  );
  const [errorResponse, setErrorResponse] = React.useState("");

  // When this component renders
  React.useEffect(() => {
    // Get the saved email
    const saved_email = window.localStorage.getItem("emailForSignIn");

    // Verify the user went through an email link and the saved email is not null
    if (isSignInWithEmailLink(auth, window.location.href) && !!saved_email) {
      // Sign the user in
      signInWithEmailLink(auth, saved_email, window.location.href);
    }
  }, []);

  const clearError = () => {
    if (errorResponse !== "") {
      setErrorResponse("");
    }
  };

  const updateEmail = (e) => {
    clearError();
    setEmail(e.target.value);
  };

  const trySignIn = async () => {
    // If the user is re-entering their email address but already has a code
    if (isSignInWithEmailLink(auth, window.location.href) && !!email) {
      // Sign the user in
      signInWithEmailLink(auth, email, window.location.href).catch((err) => {
        switch (err.code) {
          default:
            setErrorResponse("An unknown error has occured");
        }
      });
    } else {
      sendSignInLinkToEmail(auth, email, {
        url: "http://localhost:3000",
        handleCodeInApp: true,
      })
        .then(() => {
          // Save the users email to verify it after they access their email
          window.localStorage.setItem("emailForSignIn", email);
          navigate("/");
        })
        .catch((err) => {
          switch (err.code) {
            default:
              setErrorResponse("An unknown error has occured");
          }
        });
    }
  };

  return (
    <div className="sign_in">
      <span>Email:</span>
      <input type="text" value={email} onChange={updateEmail} />
      <div className="error_response">{errorResponse}</div>
      <button onClick={trySignIn}>Sign in</button>
    </div>
  );
}
