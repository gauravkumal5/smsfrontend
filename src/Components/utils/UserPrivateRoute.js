import React from "react";
import { Redirect, Route } from "react-router-dom";

const UserPrivateRoute = ({ component: Component, ...rest }) => {
   return (
      <Route
         {...rest}
         render={(props) => {
            if (localStorage.getItem("token")) {
               if (localStorage.getItem("usertype") == "student") {
                  return <Component {...props} />;
               } else {
                  return <Redirect to="/login" />;
               }
            }
            return <Redirect to="/" />;
         }}
      />
   );
};

export default UserPrivateRoute;
