import axios from "axios";
import React, { useEffect, useState } from "react";
import { Select, SInput } from "../TeacherStudent.element";
import { AddButton, RemoveButton, SInputNum, SSelect } from "./TeacherProfile.element";

const UpdateMarksList = ({ marks, add, deletes }) => {
   const access_token = localStorage.getItem("token");
   const [subjects, setSubjects] = useState({
      subject: "",

   });
   useEffect(async () => {
      setSubjects(subjects);
      const fetchData = async () => {
         await axios.get(`http://sms.test/api/getSubjects`, {
            headers: {
               Authorization: `bearer ${access_token}`,
            },
         }).then((res) => {
            const result = res.data.data;
            console.log(result);
            setSubjects(result);
         });
      };
      fetchData();
   }, []);
   const renderOptions = ()=>{
      return subjects.map((subject,index)=>(
         <option key={index} value={subject.name}>
         {subject.name}{" "}
      </option>
      ))
   }
   return marks.map((vals, idx) => {
      let subject_name = `subject_name-${idx}`,
         theory_full = `theory_full-${idx}`,
         prac_full = `prac_full-${idx}`,
         theory_marks = `theory_marks-${idx}`,
         prac_marks = `prac_marks-${idx}`;
      return (
         <tr key={vals.id}>
            <td>
               {idx < 5 ? (
                  <SInput
                     type="text"
                     name="subject_name"
                     data-id={idx}
                     id={subject_name}
                     defaultValue={vals.subject_name}
                     readOnly
                  />
               ) : (
                  <Select
                     type="text"
                     name="subject_name"
                     data-id={idx}
                     id={subject_name}
                     defaultValue={vals.subject_name}>
                        <option value="">Select</option>
                                         {renderOptions()}

                  </Select>
               )}
            </td>
            <td>
               <SInput
                  type="number"
                  name="theory_full"
                  id={theory_full}
                  data-id={idx}
                  defaultValue={vals.theory_full}
               />
            </td>
            <td>
               <SInput type="number" name="prac_full" id={prac_full} data-id={idx} defaultValue={vals.prac_full} />
            </td>
            <td>
               <SInput
                  type="number"
                  name="theory_marks"
                  id={theory_marks}
                  data-id={idx}
                  defaultValue={vals.theory_marks}
               />
            </td>
            <td>
               <SInput type="number" name="prac_marks" id={prac_marks} data-id={idx} defaultValue={vals.prac_marks} />
            </td>
            <td>
               {idx === 0 ? (
                  <AddButton onClick={() => add()} type="button">
                     <strong>+</strong>
                  </AddButton>
               ) : (
                  ""
               )}
               {idx < 5 ? (
                  ""
               ) : (
                  <RemoveButton onClick={() => deletes(vals)}>
                     <strong>-</strong>
                  </RemoveButton>
               )}
            </td>
         </tr>
      );
   });
};

export default UpdateMarksList;
