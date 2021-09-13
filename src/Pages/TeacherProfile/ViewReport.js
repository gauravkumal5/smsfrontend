import React from "react";
import Header from "../../Components/Header/Header";
import Report from "./Report";

const ViewReport = ({ id, show }) => {
   return (
      <>
         <Report id={id} show={show} />
      </>
   );
};

export default ViewReport;
