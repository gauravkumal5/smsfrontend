import React from "react";
import Header from "../../Components/Header/Header";
import ViewReport from "../TeacherProfile/ViewReport";
import STTopBar from "./STTopbar";

function StudentProfile() {
   const id = localStorage.getItem("id");
   return (
      <>
         <STTopBar/>
         <Header title="Report"   />
         <ViewReport id={id} type="student"/>
         
      </>

   );
}

export default StudentProfile;
