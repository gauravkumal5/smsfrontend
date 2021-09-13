import React from "react";
import Header from "../../Components/Header/Header";
import Topbar from "../../Components/Topbar/Topbar";
import { MainContainer } from "../../Container/MainContainer.element";
import FormTeacher from "./FormTeacher";

const AddTeacher = ({ func }) => {
   return (
      <>
         <FormTeacher type="teachers" func={func} />
      </>
   );
};

export default AddTeacher;
