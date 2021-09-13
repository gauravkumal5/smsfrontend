import React from "react";
import { Redirect, Route } from "react-router-dom";

const TeacherPrivateRoute = ({ component: Component, ...rest }) => {
   return (
      <Route
         {...rest}
         render={(props) => {
            if (localStorage.getItem("token")) {
               if (localStorage.getItem("usertype") == "teacher") {
                  return <Component {...props} />;
               } else if (localStorage.getItem("usertype") == "admin") {
                  return <Redirect to="/dashboard" />;
               } else {
                  return <Redirect to="/" />;
               }
            }
            return <Redirect to="/login" />;
         }}
      />
   );
};

export default TeacherPrivateRoute;
