import Axios from "axios";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { LoginContainer, LoginForm, LoginFormGroup, LoginInput, LoginSubmit } from "./Login.element";

const Login = () => {
   let history = useHistory();

   if (localStorage.getItem("token")) {
      if (localStorage.getItem("usertype") === "admin") {
         history.push("/dashboard");
      } else if (localStorage.getItem("usertype") === "teacher") {
         history.push("/teacher");
      } else {
         history.push("/student");
      }
   }
   const [userType, setUserType] = useState("");
   const [authInfo, setAuthInfo] = useState({
      username: "",
      password: "",
   });

   const handleUserType = (e) => {
      setUserType(e.target.value);
   };

   const handleChange = (e) => {
      setAuthInfo({
         ...authInfo,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         let res = await Axios.post(`http://sms.test/api/${userType}/login`, authInfo);
         localStorage.setItem("token", res.data.access_token);
         localStorage.setItem("usertype", userType);
         localStorage.setItem("id", res.data.user);
         if (localStorage.getItem("token")) {
            if (userType === "admin") {
               history.push("/dashboard");
            } else {
               history.push("/teacher");
            }
         } else {
            return 0;
         }
      } catch {
         alert("username or password wrong");
      }
   };

   return (
      <LoginContainer>
         <LoginForm onSubmit={handleSubmit}>
            <LoginFormGroup>
               <span>User Type</span>
               <div>
                  <LoginInput
                     type="radio"
                     checked={userType === "admin"}
                     value="admin"
                     onChange={handleUserType}
                     name="usertype"
                     required
                  />{" "}
                  Admin
                  <LoginInput
                     type="radio"
                     checked={userType === "teacher"}
                     value="teacher"
                     onChange={handleUserType}
                     name="usertype"
                     required
                  />{" "}
                  Teacher
               </div>
            </LoginFormGroup>
            <LoginFormGroup>
               <span>Username</span>
               <LoginInput type="text" name="username" value={authInfo.username} onChange={handleChange} required />
            </LoginFormGroup>
            <LoginFormGroup>
               <span>Password</span>
               <LoginInput type="password" name="password" value={authInfo.password} onChange={handleChange} required />
            </LoginFormGroup>
            <LoginSubmit type="submit" value="Login" />
         </LoginForm>
      </LoginContainer>
   );
};

export default Login;
