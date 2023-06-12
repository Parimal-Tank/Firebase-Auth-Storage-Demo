import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const  state  = useLocation();
  

  useEffect(() => {
    let token = sessionStorage.getItem("Token");

    if (!token) {
      navigate("/auth");
    }
  }, [navigate]);

  return (
    <>
      <div>Hello</div>
    </>
  );
};

export default Home;
