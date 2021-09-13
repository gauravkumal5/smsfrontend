import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ViewDetailsContainer, ViewTable } from "../TeacherStudent.element";

const ViewTeacher = ({ id }) => {
   const access_token = localStorage.getItem("token");
   const [teacher, setTeacher] = useState([]);

   useEffect(() => {
      setTeacher("");

      axios
         .get(`http://sms.test/api/admin/getTeacher/${id}`, {
            headers: {
               Authorization: `bearer ${access_token}`,
            },
         })
         .then((res) => {
            const result = res.data;
            setTeacher(result.data);
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
                     <td>{teacher.name}</td>
                  </tr>
                  <tr>
                     <td>
                        <strong>Username</strong>
                     </td>
                     <td>{teacher.username}</td>
                  </tr>
                  <tr>
                     <td>
                        <strong>Address</strong>
                     </td>
                     <td>{teacher.address}</td>
                  </tr>
                  <tr>
                     <td>
                        <strong> Contact</strong>
                     </td>
                     <td>{teacher.contact}</td>
                  </tr>
               </tbody>
            </ViewTable>
         </ViewDetailsContainer>
      </>
   );
};

export default ViewTeacher;
