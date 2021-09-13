import React from "react";
import { MarksTable, TFoot, TH } from "./TeacherProfile.element";

const ViewMarksList = ({ marks }) => {
   const mark = marks;

   const checkGrade = (mark) => {
      if (mark > 0 && mark < 20) {
         return "E";
      } else if (mark >= 20 && mark < 30) {
         return "D";
      } else if (mark >= 30 && mark < 40) {
         return "D+";
      } else if (mark >= 40 && mark < 50) {
         return "C";
      } else if (mark >= 50 && mark < 60) {
         return "C+";
      } else if (mark >= 60 && mark < 70) {
         return "B";
      } else if (mark >= 70 && mark < 80) {
         return "B+";
      } else if (mark >= 80 && mark < 90) {
         return "A";
      } else if (mark >= 90 && mark <= 100) {
         return "A+";
      }
   };

   const checkGpa = (mark) => {
      if (mark > 0 && mark < 0.8) {
         return "E";
      } else if (mark >= 0.8 && mark < 1.2) {
         return "D";
      } else if (mark >= 1.2 && mark < 1.6) {
         return "D+";
      } else if (mark >= 1.6 && mark < 2.0) {
         return "C";
      } else if (mark >= 2.0 && mark < 2.4) {
         return "C+";
      } else if (mark >= 2.4 && mark < 2.8) {
         return "B";
      } else if (mark >= 2.8 && mark < 3.2) {
         return "B+";
      } else if (mark >= 3.2 && mark < 3.6) {
         return "A";
      } else if (mark >= 3.6 && mark <= 4.0) {
         return "A+";
      }
   };

   const gradePoint = (mark) => {
      if (mark > 0 && mark < 20) {
         return 0.8;
      } else if (mark >= 20 && mark < 30) {
         return 1.2;
      } else if (mark >= 30 && mark < 40) {
         return 1.6;
      } else if (mark >= 40 && mark < 50) {
         return 2.0;
      } else if (mark >= 50 && mark < 60) {
         return 2.4;
      } else if (mark >= 60 && mark < 70) {
         return 2.8;
      } else if (mark >= 70 && mark < 80) {
         return 3.2;
      } else if (mark >= 80 && mark < 90) {
         return 3.6;
      } else if (mark >= 90 && mark <= 100) {
         return 4;
      }
   };
   const totalMarks = mark.reduce((accumulator, marks) => accumulator + marks.theory_marks + marks.prac_full, 0);

   const totalGpa = () => {
      let gpa = marks.reduce((acc, mark, index) => acc + gradePoint(mark.theory_marks + mark.prac_marks), 0);
      gpa = Math.round((gpa / mark.length) * 100) / 100;
      return gpa.toString();
      console.log(gpa);
   };
   const renderMarks = () => {
      if (!mark) {
         return (
            <tr>
               <td colSpan="12">Loading Marks....</td>
            </tr>
         );
      }

      return mark.map((marks, index) => (
         <tr key={index}>
            <td>{++index}</td>
            <td>{marks.subject_name}</td>
            <td>{marks.theory_full}</td>
            <td>{marks.prac_full}</td>
            <td>{marks.theory_marks}</td>
            <td>{checkGrade(marks.theory_marks)}</td>

            <td> {marks.prac_marks}</td>
            <td>{checkGrade(marks.prac_marks)}</td>
            <td>{marks.theory_marks + marks.prac_marks}</td>
            <td>{checkGrade(marks.theory_marks + marks.prac_marks)}</td>
            <td>{gradePoint(marks.theory_marks + marks.prac_marks)}</td>
            <td></td>
         </tr>
      ));
   };

   return (
      <>
         <MarksTable>
            <thead>
               <tr>
                  <th rowSpan="2">SN.</th>
                  <TH rowSpan="2">Subjects</TH>
                  <th colSpan="2">Full Marks</th>
                  <th colSpan="2">Theory</th>
                  <th colSpan="2">Practical</th>
                  <th rowSpan="2">Total Marks</th>
                  <th rowSpan="2">Final Grade</th>
                  <th rowSpan="2">Grade Point</th>
                  <th rowSpan="2">Remarks</th>
               </tr>
               <tr>
                  <th>T</th>
                  <th>P</th>
                  <th>Marks</th>
                  <th>Grade</th>
                  <th>Marks</th>
                  <th>Grade</th>
               </tr>
            </thead>
            <tbody>{renderMarks()}</tbody>
            <TFoot>
               <tr>
                  <td colSpan="4"></td>
                  <td colSpan="4">Grand Total</td>
                  <td>{totalMarks}</td>
                  <td>GPA</td>
                  <td>{totalGpa()}</td>
                  {/* <td></td> */}
                  <td> {checkGpa(totalGpa())}</td>
               </tr>
            </TFoot>
         </MarksTable>
      </>
   );
};

export default ViewMarksList;
