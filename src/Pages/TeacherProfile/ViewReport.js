import React from "react";
import Header from "../../Components/Header/Header";
import Report from "./Report";

const ViewReport = ({ id, show,type }) => {
   return (
      <>
         <Report id={id} show={show} type={type} />
      </>
   );
};

export default ViewReport;
