import Axios from "axios";
import { React, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ViewDetailsContainer, ViewTable, DeleteButton } from "../TeacherStudent.element";

const ViewStudent = ({ id }) => {
   const access_token = localStorage.getItem("token");
   const [studentInfo, setStudentInfo] = useState({
      name: "",
      roll_no: "",
      username: "",
      password: "",
      gender: "",
      dob: "",
      address: "",
      contact: "",
      class: "",
   });
   useEffect(async () => {
      setStudentInfo("");
      await Axios.get(`http://sms.test/api/admin/getStudent/${id}`, {
         headers: {
            Authorization: `bearer ${access_token}`,
         },
      }).then((res) => {
         const result = res.data.data;
         setStudentInfo(result);
      });
   }, [id]);
   return (
      <>
         <ViewDetailsContainer>
            <ViewTable>
               <tbody>
                  <tr>
                     <td>
                        <strong>Name</strong>
                     </td>
                     <td>{studentInfo.name}</td>
                  </tr>
                  <tr>
                     <td>
                        <strong>Username</strong>
                     </td>
                     <td>{studentInfo.username}</td>
                  </tr>
                  <tr>
                     <td>
                        <strong>Roll No.</strong>
                     </td>
                     <td>{studentInfo.roll_no}</td>
                  </tr>
                  <tr>
                     <td>
                        <strong>Gender</strong>
                     </td>
                     <td>{studentInfo.gender}</td>
                  </tr>
                  <tr>
                     <td>
                        <strong>D.O.B</strong>
                     </td>
                     <td>{studentInfo.dob}</td>
                  </tr>
                  <tr>
                     <td>
                        <strong>Address</strong>
                     </td>
                     <td>{studentInfo.address}</td>
                  </tr>
                  <tr>
                     <td>
                        <strong>Parent Contact</strong>
                     </td>
                     <td>{studentInfo.contact}</td>
                  </tr>
                  <tr>
                     <td>
                        <strong>Class</strong>
                     </td>
                     <td>{studentInfo.class}</td>
                  </tr>
               </tbody>
            </ViewTable>
         </ViewDetailsContainer>
      </>
   );
};

export default ViewStudent;
