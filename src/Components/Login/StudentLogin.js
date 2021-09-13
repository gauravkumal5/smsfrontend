import Axios from "axios";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { LoginContainer, LoginForm, LoginFormGroup, LoginInput, LoginSubmit } from "./Login.element";

const StudentLogin = () => {
   let history = useHistory();

   if (localStorage.getItem("token")) {
      if (localStorage.getItem("usertype") == "student") {
         history.push("/student");
      } else {
         history.push("/dashboard");
      }
   }
   const [authInfo, setAuthInfo] = useState({
      username: "",
      password: "",
   });
   const handleChange = (e) => {
      setAuthInfo({
         ...authInfo,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      let res = await Axios.post(`http://sms.test/api/user/login`, authInfo);
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("id", res.data.user);
      localStorage.setItem("usertype", "student");
      if (localStorage.getItem("token") && localStorage.getItem("usertype") == "student") {
         history.push("/student");
      } else {
         return 0;
      }
   };

   return (
      <LoginContainer>
         <LoginForm onSubmit={handleSubmit}>
            <LoginFormGroup>
               Username
               <LoginInput type="text" name="username" value={authInfo.username} onChange={handleChange} />
            </LoginFormGroup>

            <LoginFormGroup>
               Password
               <LoginInput type="password" name="password" value={authInfo.password} onChange={handleChange} />
            </LoginFormGroup>

            <LoginSubmit type="submit" value="Login" />
         </LoginForm>
      </LoginContainer>
   );
};

export default StudentLogin;
