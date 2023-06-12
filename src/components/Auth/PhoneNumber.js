import React, { useEffect } from "react";
import { Button, Divider, Grid, TextField } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import { auth } from "../../firebase/firebaseConfig";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const PhoneNumber = () => {
  const [phone, setPhone] = React.useState("");
  const [code, setCode] = React.useState("");

  const handleConfirmCode = () => {
    if (!code) {
      alert("Please add the code");
    } else {
      window.confirmationResult
        .confirm(code)
        .then((result) => console.log(result.user, "result"));
    }
  };

  const handleSendOtp = () => {
    if (!phone) {
      alert("Enter the number please");
    } else {
      const appVerifier = window.recaptchaVerifier;
      const phoneValue = "+" + phone;

      signInWithPhoneNumber(auth, phoneValue, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          console.log(response, "response");
        },
      },
      auth
    );
  }, []);

  return (
    <div>
      <Divider />
      <br />
      <PhoneInput value={phone} onChange={(val) => setPhone(val)} />
      <br />
      <TextField
        value={code}
        onChange={(e) => {
          const val = e.target.value;
          setCode(val);
        }}
        placeholder="Enter verification code"
      />
      <br />
      <br />
      <Grid container justify="space-between">
        <Grid item>
          <Button id="sign-in-button" onClick={() => handleSendOtp()}>
            Send Code
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={() => handleConfirmCode()}>Confirm Code</Button>
        </Grid>
      </Grid>
      <br />
    </div>
  );
};
export default PhoneNumber;
