import React, { useEffect } from "react";
import Goal from "./Goal";
import Hero from "./Hero";
import Navbar from "./Navbar";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../Constants";
import { jwtDecode } from "jwt-decode";
const Home = () => {
  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      return;
    }
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration < now) {
      const access_token = localStorage.getItem(ACCESS_TOKEN);
      const refresh_token = localStorage.getItem(REFRESH_TOKEN);
      if (access_token != "" && refresh_token != "") {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
         location.reload();
      }
    } else {
      console.log("OOPS SOMETHING WENT WRONG.....");
    }
  });

  return (
    <div>
      <Navbar />
      <Hero />
      <Goal />
    </div>
  );
};

export default Home;
