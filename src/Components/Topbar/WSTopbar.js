import React from "react";
import { TopbarContainer } from "./Topbar.element";
import { Link } from "react-router-dom";
import Event from "../../Pages/Admin/Event";
import Header from "../Header/Header";
import WSEvent from "../../Pages/Home/WSEvent";

const WSTopbar = () => {
   return (
      <>
      <TopbarContainer style={{ margin:"0rem", padding:"0rem",backgroundColor: "lightgrey", width:"100%", height:"5rem" }}>
         <div>
            <h1 style={{padding:"1rem"}}>JNM</h1>
         </div>
         <div >
         <Link to={"/studentlogin"}>
            Login
         </Link>
         </div>
      </TopbarContainer>
      <Header title="School Events" show="false" />

      </>
   );
};

export default WSTopbar;
