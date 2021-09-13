import React from "react";
import { Link, useHistory } from "react-router-dom";

const TopBar = () => {
   let history = useHistory();
   const logout = (e) => {
      e.preventDefault();
      localStorage.clear();
      history.push("/login");
   };
   return (
      <>
         <Link to="#" type="button" style={{ color: "white" }}>
            Teacher
         </Link>
         <Link to="#" type="button" onClick={logout} style={{ color: "white" }}>
            Logout
         </Link>
      </>
   );
};

export default TopBar;
