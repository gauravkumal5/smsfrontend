import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Header from "../../Components/Header/Header";
import { TextArea } from "../../Globalstyle";
import { FormGroup, Select, SInput, Submit } from "../TeacherStudent.element";
import UpdateMarksList from "./UpdateMarksList";
import {
   CommonContainer,
   ReportForm,
   ReportFormGroup,
   ReportFormContainer,
   ReportTable,
   AddButton,
} from "./TeacherProfile.element";

const UpdateReport = () => {
   const access_token = localStorage.getItem("token");
   const { id } = useParams();
   const [report, setReport] = useState({
      user_id: "",
      term: "",
      marks: [
         {
            id: Math.random(),
            subject_name: "",
            theory_full: "",
            prac_full: "",
            theory_marks: "",
            prac_marks: "",
         },
      ],
      school_days: "",
      present_days: "",
      teacher_comment: "",
   });
   useEffect(async () => {
      Axios.get(`http://sms.test/api/getReport/${id}`, {
         headers: {
            Authorization: `bearer ${access_token}`,
         },
      }).then((res) => {
         const result = res.data.data;
         setReport(result);
      });
   }, []);
   console.log(report);
   const handleChange = (e) => {
      if (["subject_name", "theory_full", "prac_full", "theory_marks", "prac_marks"].includes(e.target.name)) {
         let marks = [...report.marks];
         marks[e.target.dataset.id][e.target.name] = e.target.value;
      } else {
         setReport({
            ...report,
            [e.target.name]: e.target.value,
         });
      }
   };
   const addNewRow = (e) => {
      setReport({
         ...report,
         marks: [
            ...report.marks,
            {
               id: Math.random(),
               subject_name: "",
               theory_full: "",
               prac_full: "",
               theory_marks: "",
               prac_marks: "",
            },
         ],
      });
   };

   const clickOnDelete = (record) => {
      setReport({ ...report, marks: report.marks.filter((r) => r !== record) });
   };
   const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(report);

      try {
         const res = await Axios.put(`http://sms.test/api/updateReport/${id}`, report, {
            headers: {
               Authorization: `bearer ${access_token}`,
            },
         });

         alert(res.data.data);
         console.log(res.data);
         // history.push("/dashboard/students");
      } catch {
         alert("failed to update ");
      }
   };

   return (
      <>
         <Header title="Generate Report" />
         <ReportForm onSubmit={handleSubmit} onChange={handleChange}>
            <CommonContainer>
               <ReportFormGroup>
                  <span>Name</span>
                  <SInput name="user_id" defaultValue={report.user_id} />
               </ReportFormGroup>
               <ReportFormGroup>
                  <span>Terminal</span>
                  <Select name="term" value={report.term} onChange={handleChange}>
                     <option value="">Select Term</option>
                     <option value="First">First</option>
                     <option value="Second">Second</option>
                     <option value="Third">Third</option>
                     <option value="Final">Final</option>
                  </Select>
               </ReportFormGroup>
               <FormGroup>
                  <span>School Days</span>
                  <SInput type="number" name="school_days" defaultValue={report.school_days} />
               </FormGroup>
               <FormGroup>
                  <span>Present Days</span>
                  <SInput type="number" name="present_days" defaultValue={report.present_days} />
               </FormGroup>
               <div style={{ margin: "1rem", display: "flex", flexDirection: "column" }}>
                  <span>Teachers Comment</span>
                  <TextArea cols="20" rows="3" name="teacher_comment" defaultValue={report.teacher_comment} />
               </div>
               <div>
                  <Submit type="submit" value="Submit" />
               </div>
            </CommonContainer>

            <ReportTable>
               <thead>
                  <tr>
                     <th rowSpan="2">Subjects</th>
                     <th colSpan="2">Full Marks</th>
                     <th rowSpan="2">Theory</th>
                     <th rowSpan="2">Practical</th>
                     <th rowSpan="2">OP</th>
                  </tr>
                  <tr>
                     <th>T</th>
                     <th>P</th>
                  </tr>
               </thead>
               <tbody>
                  <UpdateMarksList add={addNewRow} deletes={clickOnDelete} marks={report.marks} />
               </tbody>
               {/* <tfoot>
                     <tr>
                        <td>
                           <AddButton
                              style={{ backgroundColor: "DodgerBlue", color: "white" }}
                              onClick={addNewRow}
                              type="button">
                              <strong>+</strong>
                           </AddButton>
                        </td>
                     </tr>
                  </tfoot> */}
            </ReportTable>
         </ReportForm>
      </>
   );
};

export default UpdateReport;
