import React, { useEffect } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import PhoneNumber from "../Auth/PhoneNumber";
import { AiFillPhone } from "react-icons/ai";

const AuthProviders = () => {
  const [showPhone, setShowPhone] = React.useState(false);

  const googleAuthProvider = new GoogleAuthProvider();
  const githubAuthProvider = new GithubAuthProvider();
  const navigate = useNavigate();

  // useEffect(() => {
  //   let token = sessionStorage.getItem("Token");

  //   if (token) {
  //     navigate("/home");
  //   }
  // }, [navigate]);

  const signUpWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider).then((response) => {
      sessionStorage.setItem("Token", response.user.accessToken);

      const credential = GoogleAuthProvider.credentialFromResult(response);
      const token = credential.accessToken;
      console.log("token: ", token);
      // The signed-in user info.
      const user = response.user;
      console.log("user: ", user);
      // navigate("/home", { user: user });
      if (user) {
        console.log("here");
        return navigate("/home", { state: { user: "user?.UserImpl" } });
      }
      console.log("Sing in With Google ");
    });
  };

  const signUpWithGithub = () => {
    signInWithPopup(auth, githubAuthProvider).then((response) => {
      sessionStorage.setItem("Token", response.user.accessToken);

      const credential = GithubAuthProvider.credentialFromResult(response);
      const token = credential.accessToken;
      console.log("token: ", token);

      // The signed-in user info.
      const user = response.user;
      console.log("user: ", user);
      // IdP data available using getAdditionalUserInfo(result)

      navigate("/home");
    });
  };

  return (
    <div>
      <button className="google-btn" onClick={signUpWithGoogle}>
        <div className="google-icon-wrapper">
          <img
            alt="Google icon"
            className="google-icon"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          />
        </div>
        Sign in with Google
        {/* <p className="btn-text">
          <b></b>
        </p> */}
      </button>

      <button onClick={signUpWithGithub}>Github</button>
      <br />

      <button
        variant={showPhone ? "contained" : "outlined"}
        color="primary"
        fullWidth
        startIcon={<AiFillPhone />}
        size="large"
        className="githubButton"
        onClick={() => setShowPhone(!showPhone)}
      >
        Login with Phone
      </button>
      <br />
      <br />
      {showPhone && <PhoneNumber />}
    </div>
  );
};

export default AuthProviders;
