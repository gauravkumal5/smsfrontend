import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { FormContainer, FormGroup, SForm, RadioBtn, RadioGroup, Submit, SInput } from "../TeacherStudent.element";
import { store } from "react-notifications-component";

const FormTeacher = ({ func }) => {
   const access_token = localStorage.getItem("token");
   let history = useHistory();
   const [teacherInfo, setTeacherInfo] = useState({
      name: "",
      username: "",
      password: "pass123",
      address: "",
      contact: "",
   });

   const handleChange = async (e) => {
      setTeacherInfo({
         ...teacherInfo,
         [e.target.name]: e.target.value,
      });
   };
   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const res = await axios.post(`http://sms.test/api/admin/addTeacher`, teacherInfo, {
            headers: {
               Authorization: `bearer ${access_token}`,
            },
         });

         if (res.data.data === "duplicate") {
            store.addNotification({
               title: "Duplicate",
               message: "Username must be unique",
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
            func();
            store.addNotification({
               title: "Success",
               message: "Teachers details are stored",
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
            message: "Failed to store teachers details",
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
      <FormContainer className="animate__animated animate__fadeIn">
         <SForm onSubmit={handleSubmit}>
            <FormGroup>
               <span> Full Name</span>
               <SInput type="text" name="name" value={teacherInfo.name} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
               <span> Username</span>
               <SInput type="text" name="username" value={teacherInfo.username} onChange={handleChange} required />
            </FormGroup>
            
            <FormGroup>
               <span> Password</span>
               <SInput type="password" name="password" value={teacherInfo.password} onChange={handleChange} required />
            </FormGroup>
            <p style={{fontSize:"10px", textAlign:"center",color:"green"}}>Password is pass123 by default</p>
            <FormGroup>
               <span> Address</span>
               <SInput type="text" name="address" value={teacherInfo.address} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
               <span> Contant No.</span>
               <SInput type="telephone" name="contact" value={teacherInfo.contact} onChange={handleChange} required />
            </FormGroup>
            <Submit value="Submit" type="submit" />
         </SForm>
      </FormContainer>
   );
};

export default FormTeacher;
