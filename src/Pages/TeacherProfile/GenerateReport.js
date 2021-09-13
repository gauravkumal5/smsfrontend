import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import { TextArea } from "../../Globalstyle";
import GetStudent from "./GetStudent";
import { FormGroup, SInput, Select, Submit } from "../TeacherStudent.element";
import MarksList from "./MarksList";
import { CommonContainer, ReportForm, ReportFormGroup, ReportTable, AddButton } from "./TeacherProfile.element";

const GenerateReport = () => {
   const access_token = localStorage.getItem("token");
   const id = localStorage.getItem("id");
   const [students, setStudents] = useState([]);
   const [report, setReport] = useState({
      user_id: "",
      terminal: "",
      marksList: [
         {
            index: Math.random(),
            subject_name: "Nepali",
            theory_full: "100",
            prac_full: "0",
            theory_marks: "",
            prac_marks: "",
         },
         {
            index: Math.random(),
            subject_name: "English",
            theory_full: "100",
            prac_full: "0",
            theory_marks: "",
            prac_marks: "",
         },
         {
            index: Math.random(),
            subject_name: "Math",
            theory_full: "100",
            prac_full: "0",
            theory_marks: "",
            prac_marks: "",
         },
         {
            index: Math.random(),
            subject_name: "Science",
            theory_full: "75",
            prac_full: "25",
            theory_marks: "",
            prac_marks: "",
         },
         {
            index: Math.random(),
            subject_name: "Social",
            theory_full: "100",
            prac_full: "0",
            theory_marks: "",
            prac_marks: "",
         },
      ],
      school_days: "",
      present_days: "",
      teacher_comment: "",
   });
   const handleChange = (e) => {
      if (["subject_name", "theory_full", "prac_full", "theory_marks", "prac_marks"].includes(e.target.name)) {
         let marksList = [...report.marksList];
         marksList[e.target.dataset.id][e.target.name] = e.target.value;
      } else {
         setReport({
            ...report,
            [e.target.name]: e.target.value,
         });
      }
   };
   console.log(report);
   const addNewRow = (e) => {
      setReport({
         ...report,
         marksList: [
            ...report.marksList,
            {
               index: Math.random(),
               subject_name: "",
               theory_full: "",
               prac_full: "",
               theory_marks: "",
               prac_marks: "",
            },
         ],
      });
   };

   const deleteRow = (index) => {
      setReport({
         marksList: report.marksList.filter((s, sindex) => index !== sindex),
      });
   };
   const clickOnDelete = (record) => {
      setReport({ ...report, marksList: report.marksList.filter((r) => r !== record) });
   };
   const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(report);

      try {
         const res = await axios.post(`http://sms.test/api/addReport`, report, {
            headers: {
               Authorization: `bearer ${access_token}`,
            },
         });

         alert(res.data.data);
         console.log(res.data);
         // history.push("/dashboard/students");
      } catch {
         alert("failed to add ");
      }
   };
   const fetchStudents = async () => {
      await axios
         .get(`http://sms.test/api/getTeacherStudent/${id}`, {
            headers: {
               Authorization: `bearer ${access_token}`,
            },
         })
         .then((res) => {
            const result = res.data;
            setStudents(result.data);
         });
   };
   useEffect(() => {
      fetchStudents();
   }, []);
   console.log(students);
   return (
      <>
         <ReportForm onSubmit={handleSubmit} onChange={handleChange}>
            <CommonContainer>
               <ReportFormGroup>
                  <span>Name</span>
                  <Select name="user_id">
                     <option value="">Select Student</option>
                     <GetStudent students={students} />
                  </Select>
               </ReportFormGroup>
               <ReportFormGroup>
                  <span>Terminal</span>
                  <Select name="terminal">
                     <option value="">Select Term</option>
                     <option value="First">First</option>
                     <option value="Second">Second</option>
                     <option value="Third">Third</option>
                     <option value="Final">Final</option>
                  </Select>
               </ReportFormGroup>
               <ReportFormGroup>
                  <span>School Days</span>
                  <SInput type="number" name="school_days" />
               </ReportFormGroup>
               <ReportFormGroup>
                  <span>Present Days</span>
                  <SInput type="number" name="present_days" />
               </ReportFormGroup>
               <ReportFormGroup>
                  <span>Teachers Comment</span>
                  <TextArea cols="20" rows="3" name="teacher_comment" />
               </ReportFormGroup>
               <ReportFormGroup>
                  <Submit type="submit" value="Submit" />
               </ReportFormGroup>
            </CommonContainer>

            <div style={{ height: "inherit", overflow: "scroll" }}>
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
                     <MarksList add={addNewRow} deletes={clickOnDelete} marksList={report.marksList} />
                  </tbody>
               </ReportTable>
            </div>
         </ReportForm>
      </>
   );
};

export default GenerateReport;
