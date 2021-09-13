import React from "react";
import Header from "../../Components/Header/Header";
import FormStudent from "./FormStudent";

const AddStudent = ({ func, setFilter }) => {
   return (
      <>
         {/* <Header title="Students" action="false" /> */}
         <FormStudent type="students" func={func} setFilter={setFilter} />
      </>
   );
};

export default AddStudent;
