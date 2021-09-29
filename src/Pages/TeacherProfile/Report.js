import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useReactToPrint } from "react-to-print";
import { OperationButton } from "../TeacherStudent.element";
import { Link } from "react-router-dom";
import PrintIcon from "@material-ui/icons/Print";
import {
   AttendanceTable,
   GradeInfo,
   ReportView,
   ReportViewContainer,
   StudentInfo,
   CommentSection,
   ApprovalSection,
   TD,
} from "./TeacherProfile.element";
import ViewMarksList from "./ViewMarksList";

const Report = ({ id, show }) => {
   const access_token = localStorage.getItem("token");
   const componentRef = useRef();
   const handlePrint = useReactToPrint({
      content: () => componentRef.current,
   });
   const [report, setReport] = useState(null);
   // console.log(report);
   useEffect(async () => {
      // setReport("");

      axios
         .get(`http://sms.test/api/getReport/${id}`, {
            headers: {
               Authorization: `bearer ${access_token}`,
            },
         })
         .then((res) => {
            const result = res.data.data;
            setReport(result);
         })
         .catch((error) => {
            console.log(error);
         });
   }, [id]);
   console.log(report);

   const loadView = () => {
      return (
         <ReportView>
            <div className="view">
               <h1>
                  Janak Nath Memorial Higher <br /> Secondary School
               </h1>
               <br />
               <p>
                  <em>Address : Lainchaur Kathmandu </em>
               </p>
               <br />
               <h2>[Grade-Sheet]</h2>
               <h2> {report.term} Terminal Examination</h2>

               <StudentInfo>
                  <p>
                     Name Of Student: <span>{report.users.name}</span>
                  </p>
                  <span style={{ display: "flex", width: "20vw", justifyContent: "space-between" }}>
                     <p>
                        Class :<span>{report.users.class}</span>
                     </p>
                     <p>
                        Roll No<span> {report.users.roll_no}</span>
                     </p>
                  </span>
               </StudentInfo>
               <ViewMarksList marks={report.marks} />
               <span style={{ display: "flex", justifyContent: "space-between", marginTop: "3rem" }}>
                  <GradeInfo>
                     <thead>
                        <tr>
                           <th>S.N</th>
                           <th>Equivalent</th>
                           <th>Grade</th>
                           <th>Grade Point</th>
                           <th>Grade Evaluation</th>
                        </tr>
                        <tr>
                           <td>1</td>
                           <td>90 to 100</td>
                           <td>A+</td>
                           <td>4.0</td>
                           <td>Outstanding</td>
                        </tr>
                        <tr>
                           <td>2</td>
                           <td>80 to below 90</td>
                           <td>A</td>
                           <td>3.6</td>
                           <td>Excellent</td>
                        </tr>
                        <tr>
                           <td>3</td>
                           <td>70 to below 89</td>
                           <td>B+</td>
                           <td>3.2</td>
                           <td>Very Good</td>
                        </tr>
                        <tr>
                           <td>4</td>
                           <td>60 to below 70</td>
                           <td>B</td>
                           <td>2.8</td>
                           <td>Good</td>
                        </tr>
                        <tr>
                           <td>5</td>
                           <td>50 to below</td>
                           <td>C+</td>
                           <td>2.4</td>
                           <td>Satisfactory</td>
                        </tr>
                        <tr>
                           <td>6</td>
                           <td>40 to below 50</td>
                           <td>C</td>
                           <td>2.0</td>
                           <td>Acceptable</td>
                        </tr>
                        <tr>
                           <td>7</td>
                           <td>30 to below 40</td>
                           <td>D+</td>
                           <td>1.6</td>
                           <td>Partially Acceptable</td>
                        </tr>
                        <tr>
                           <td>8</td>
                           <td>20 to below 30</td>
                           <td>D</td>
                           <td>1.2</td>
                           <td>Insufficient</td>
                        </tr>
                        <tr>
                           <td>9</td>
                           <td>0 to below 20</td>
                           <td>E</td>
                           <td>0.8</td>
                           <td> Very Insufficient</td>
                        </tr>
                     </thead>
                     <tfoot>
                        <tr>
                           <td colSpan="5">Student must secure at least C grade to pass in each subject</td>
                        </tr>
                     </tfoot>
                  </GradeInfo>
                  <AttendanceTable>
                     <thead>
                        <tr>
                           <th colSpan="2">Attendance</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td>School Days</td>
                           <td>{report.school_days}</td>
                        </tr>
                        <tr>
                           <td>Present Days</td>
                           <td>{report.present_days}</td>
                        </tr>
                        <tr>
                           <td>Absent Days</td>
                           <td>{report.school_days - report.present_days}</td>
                        </tr>
                     </tbody>
                  </AttendanceTable>
               </span>
               <CommentSection>
                  <p style={{ width: "30%", marginRight: "1rem" }}>Class Teacher's Comment:</p>
                  <p style={{ width: "70%", textAlign: "left" }}>{report.teacher_comment}</p>
               </CommentSection>
               <ApprovalSection>
                  <tbody>
                     <tr>
                        <td>faldfljas</td>
                        <td> </td>
                        <td></td>
                        <td></td>
                     </tr>
                     <tr>
                        <TD>Date</TD>
                        <TD> Class Teacher</TD>
                        <TD>School Seal</TD>
                        <TD> Principal</TD>
                     </tr>
                  </tbody>
               </ApprovalSection>
            </div>
         </ReportView>
      );
   };
   const renderReport = () => {
      if (report === null) {
         return (
            <>
               <h1>Loading</h1>
            </>
         );
      } else if (report === "empty") {
         return (
            <>
               <h1>No Recent Report Found </h1>
            </>
         );
      } else {
         return (
            <>
               <div style={{display: "flex", justifyContent:"end", marginRight:"1rem", fontSize:"1.5rem"}}>
               <PrintIcon onClick={handlePrint}>Print</PrintIcon>
               </div>
               {/* <Link color="orange" to={`/teacher/updateReport/${report.id}`}>
                  Update
               </Link> */}

               <ReportViewContainer ref={componentRef}> {loadView()} </ReportViewContainer>
            </>
         );
      }
   };

   return <>{renderReport()}</>;
};

export default Report;
