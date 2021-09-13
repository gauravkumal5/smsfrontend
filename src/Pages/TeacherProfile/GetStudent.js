import React from "react";

const GetStudent = ({ students }) => {
   const getStudent = () => {
      return students.map((student, index) => (
         <option key={index} value={student.id}>
            {student.name}{" "}
         </option>
      ));
   };

   return getStudent();
};

export default GetStudent;
