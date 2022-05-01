import Axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
   FormContainer,
   FormGroup,
   SForm,
   RadioBtn,
   RadioGroup,
   Submit,
   SInput,
} from "../TeacherStudent.element";
import Moment from "moment";
import { Store } from "react-notifications-component";

const FormStudent = ({ func, setFilter }) => {
   const access_token = localStorage.getItem("token");
   
   const [studentInfo, setStudentInfo] = useState({
      name: "",
      roll_no: "",
      username: "",
      password: "pass123",
      gender: "",
      dob: "",
      address: "",
      contact: "",
      class: "",
   });

   const {name, roll_no, username, password, gender, dob, address, contact }=studentInfo; 



   let date = new Date();
   date = Moment(date).format("YYYY-MM-DD");

   const handleChange = async (e) => {
      setStudentInfo({
         ...studentInfo,
         [e.target.name]: e.target.value,
      });

   };
 

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const res = await Axios.post(`http://sms.test/api/admin/addStudent`, studentInfo, {
            headers: {
               Authorization: `bearer ${access_token}`,
            },
         });

         if (res.data.data === "duplicate") {
            Store.addNotification({
               title: "Duplicate",
               message: "Username already exist",
               type: "warning",
               insert: "top",
               container: "top-right",
               animationIn: ["animate__animated", "animate__slideInRight"],
               animationOut: ["animate__animated", "animate__slideOutRight"],
               dismiss: {
                  duration: 3000,
               },
            });
         } else {
            setFilter();
            func();
            Store.addNotification({
               title: "Stored",
               message: "Student details are stored",
               type: "success",
               insert: "top",
               container: "top-right",
               animationIn: ["animate__animated", "animate__slideInRight"],
               animationOut: ["animate__animated", "animate__slideOutRight"],
               dismiss: {
                  duration: 3000,
               },
            });
         }
      } catch {
         Store.addNotification({
            title: "Failed",
            message: "Failed to store student details",
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__slideInRight"],
            animationOut: ["animate__animated", "animate__slideOutRight"],
            dismiss: {
               duration: 3000,
            },
         });
      }
   };

   return (
      <FormContainer>
         <SForm onSubmit={handleSubmit}>
            <FormGroup>
               <span> Full Name</span>
               <SInput type="text" name="name" onChange={handleChange} value={studentInfo.name} required />
            </FormGroup>
            <FormGroup>
               <span> Roll No.</span>
               <SInput
                  type="number"
                  min="1"
                  name="roll_no"
                  onChange={handleChange}
                  value={studentInfo.roll_no}
                  required
               />
            </FormGroup>

            <FormGroup>
               <span> Username</span>
               <SInput
                  type="text"
                  name="username"
                  minLength="5"
                  onChange={handleChange}
                  value={username}
                  required
               />
            </FormGroup>

            <FormGroup>
               <span> Password</span>
               <SInput type="password" name="password" onChange={handleChange} value={studentInfo.password} required />
            </FormGroup>
            <p style={{fontSize:"10px", textAlign:"center",color:"green"}}>Password is pass123 by default</p>
            <FormGroup>
               <span>Gender</span>
               <RadioGroup>
                  <RadioBtn>
                     <input
                        type="radio"
                        checked={studentInfo.gender === "male"}
                        value="male"
                        onChange={handleChange}
                        name="gender"
                        required
                     />
                     Male
                  </RadioBtn>
                  <RadioBtn>
                     <input
                        type="radio"
                        checked={studentInfo.gender === "female"}
                        value="female"
                        onChange={handleChange}
                        name="gender"
                     />
                     Female
                  </RadioBtn>
               </RadioGroup>
            </FormGroup>
            <FormGroup>
               <span> Birth Date</span>
               <SInput type="date" onChange={handleChange} value={studentInfo.dob} name="dob" max={date} required />
            </FormGroup>
            <FormGroup>
               <span> Address</span>
               <SInput type="text" onChange={handleChange} value={studentInfo.address} name="address" required />
            </FormGroup>
            <FormGroup>
               <span> Parents Contact No.</span>
               <SInput type="telephone" onChange={handleChange} value={studentInfo.contact} name="contact" required />
            </FormGroup>
            <FormGroup>
               <span> Class</span>
               <SInput
                  type="number"
                  min="1"
                  max="10"
                  onChange={handleChange}
                  value={studentInfo.class}
                  name="class"
                  required
               />
            </FormGroup>

            <FormGroup>
               <Submit value="Submit" type="submit" />
            </FormGroup>
         </SForm>
      </FormContainer>
   );
};

export default FormStudent;
