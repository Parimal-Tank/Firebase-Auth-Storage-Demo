import "./App.css";
import { Container } from "react-bootstrap";
import AuthProvider from "./context/AuthContext";
import SignUp from "./components/Auth/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Auth/Login";
import PrivateRoute from "./Private Routing/PrivateRoute";
import ForgotPassword from "./components/Auth/ForgotPassword";
import UpdateProfile from "./components/Auth/UpdateProfile";
import { SignInWithEmail } from "./components/Auth/SignInWithEmail";
import Example from "../src/components/Auth/Example";
import UploadFile from "./uploadfile/UploadFile";
import Home from "./components/Home";
import AuthProviders from "./components/AuthProvider/AuthProviders";

function App() {
  return (
    <div className="App">
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path="/signup" Component={SignUp}></Route>
                <Route path="/login" Component={Login}></Route>
                {/* In this ForgotPassword user get a one mail regarding tha change password */}
                <Route path="/forgot-password" Component={ForgotPassword} />

                {/* In this sign-in-with-email Route we can verify the user by adding email, user get
                the link of verification email in their account along with token in url. */}
                <Route path="/sign-in-with-email" Component={SignInWithEmail} />

                {/* This route same as above route for signInWithEmail */}
                <Route path="/sign-in-email" Component={Example} />

                {/* This is for upload file such as Image , Pdf , Doc , Zip file and also we can download the File */}
                <Route path="/upload-file" Component={UploadFile} />

                {/* In This route Contains 2 Auth :) Google , Github  */}
                <Route path="/auth" Component={AuthProviders} />

                {/* This is Home page for Redirecting the page after login or auth */}
                <Route path="/home" Component={Home} />

                {/* In this Private Route is Used for secure route in that check based on token */}
                <Route element={<PrivateRoute />}>
                  <Route path="/" Component={Dashboard} />

                  {/* This is Update Profile Route */}
                  <Route path="/update-profile" Component={UpdateProfile} />
                </Route>
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </div>
      </Container>
    </div>
  );
}

export default App;
