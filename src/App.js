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
                <Route path="/forgot-password" Component={ForgotPassword} />
                <Route path="/sign-in-with-email" Component={SignInWithEmail} />
                <Route path="/sign-in-email" Component={Example} />
                <Route path="/upload-file" Component={UploadFile} />

                <Route element={<PrivateRoute />}>
                  <Route path="/" Component={Dashboard} />
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
