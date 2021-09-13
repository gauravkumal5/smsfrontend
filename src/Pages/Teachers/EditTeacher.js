import Axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import { FormContainer, FormGroup, SForm, SInput, Submit } from "../TeacherStudent.element";
import { store } from "react-notifications-component";

const EditTeacher = ({ id }) => {
   const access_token = localStorage.getItem("token");
   const [teacherInfo, setTeacherInfo] = useState({
      name: "",
      username: "",
      password: "",
      address: "",
      contact: "",
   });
   const [teacherInfos, setTeacherInfos] = useState({
      name: " ",
      username: " ",
      password: " ",
      address: " ",
      contact: " ",
   });

   useEffect(async () => {
      setTeacherInfo(teacherInfos);
      Axios.get(`http://sms.test/api/admin/getTeacher/${id}`, {
         headers: {
            Authorization: `bearer ${access_token}`,
         },
      }).then((res) => {
         const result = res.data.data;
         setTeacherInfo(result);
      });
   }, [id]);

   const handleChange = async (e) => {
      setTeacherInfo({
         ...teacherInfo,
         [e.target.name]: e.target.value,
      });
   };
   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const res = await Axios.put(`http://sms.test/api/admin/updateTeacher/${id}`, teacherInfo, {
            headers: {
               Authorization: `bearer ${access_token}`,
            },
         });

         if (res.data.data === "duplicate") {
            store.addNotification({
               title: "Duplicate",
               message: "Username already exist",
               type: "warning",
               insert: "top",
               container: "top-right",
               animationIn: ["animate__animated", "animate__slideInRight"],
               animationOut: ["animate__animated", "animate__slideOutRight"],
               dismiss: {
                  duration: 2500,
               },
            });
         } else {
            store.addNotification({
               title: "Updated",
               message: "Teachers details are updated",
               type: "success",
               insert: "top",
               container: "top-right",
               animationIn: ["animate__animated", "animate__slideInRight"],
               animationOut: ["animate__animated", "animate__slideOutRight"],
               dismiss: {
                  duration: 2500,
               },
            });
         }
      } catch {
         store.addNotification({
            title: "Failed",
            message: "Failed to update student details",
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__slideInRight"],
            animationOut: ["animate__animated", "animate__slideOutRight"],
            dismiss: {
               duration: 2500,
            },
         });
      }
   };

   return (
      <>
         <FormContainer>
            <SForm onSubmit={handleSubmit}>
               <FormGroup>
                  <span> Full Name</span>
                  <SInput type="text" name="name" onChange={handleChange} value={teacherInfo.name} required />
               </FormGroup>
               <FormGroup>
                  <span> Username</span>
                  <SInput type="text" name="username" onChange={handleChange} value={teacherInfo.username} required />
               </FormGroup>
               <FormGroup>
                  <span> Password</span>
                  <SInput
                     type="password"
                     name="password"
                     onChange={handleChange}
                     value={teacherInfo.password}
                     required
                  />
               </FormGroup>
               <FormGroup>
                  <span> Address</span>
                  <SInput type="text" onChange={handleChange} value={teacherInfo.address} name="address" required />
               </FormGroup>
               <FormGroup>
                  <span> Contact No.</span>
                  <SInput
                     type="telephone"
                     onChange={handleChange}
                     value={teacherInfo.contact}
                     name="contact"
                     required
                  />
               </FormGroup>
               <Submit value="Submit" type="submit" />
            </SForm>
         </FormContainer>
      </>
   );
};

export default EditTeacher;
