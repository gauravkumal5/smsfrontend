import Axios from "axios";
import React, { useEffect, useState } from "react";
import { FormContainer, FormGroup, RadioBtn, RadioGroup, SForm, SInput, Submit } from "../TeacherStudent.element";
import { Store } from "react-notifications-component";

const EditStudent = ({ id, show,func }) => {
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
   const [studentInfos] = useState({
      name: " ",
      roll_no: " ",
      username: " ",
      password: " ",
      gender: " ",
      dob: " ",
      address: " ",
      contact: " ",
      class: " ",
   });
   useEffect(async () => {
      setStudentInfo(studentInfos);
      const fetchData = async () => {
         await Axios.get(`http://sms.test/api/user/getStudent/${id}`, {
            headers: {
               Authorization: `bearer ${access_token}`,
            },
         }).then((res) => {
            const result = res.data.data;
            setStudentInfo(result);
         });
      };
      fetchData();
   }, [id]);

   const handleChange = async (e) => {
      setStudentInfo({
         ...studentInfo,
         [e.target.name]: e.target.value,
      });
   };
   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const res = await Axios.put(`http://sms.test/api/user/updateStudent/${id}`, studentInfo, {
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
                  duration: 2500,
               },
            });
         } else {
            show();
            func();
            Store.addNotification({
               title: "Updated",
               message: "Student details are updated",
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
         Store.addNotification({
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
                     onChange={handleChange}
                     value={studentInfo.username}
                     minlength="4"
                     required
                  />
               </FormGroup>

               {/* <FormGroup>
                  <span> Password</span>
                  <SInput
                     type="password"
                     name="password"
                     onChange={handleChange}
                     value={studentInfo.password}
                     required
                  />
               </FormGroup> */}
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
                  <SInput type="date" onChange={handleChange} value={studentInfo.dob} name="dob" required />
               </FormGroup>
               <FormGroup>
                  <span> Address</span>
                  <SInput type="text" onChange={handleChange} value={studentInfo.address} name="address" required />
               </FormGroup>
               <FormGroup>
                  <span> Parents Contact No.</span>
                  <SInput
                     type="telephone"
                     onChange={handleChange}
                     value={studentInfo.contact}
                     name="contact"
                     required
                  />
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
               <div style={{ display: "flex", justifyContent: "center" }}>
                  <Submit value="Update" type="submit" />
               </div>
            </SForm>
         </FormContainer>
      </>
   );
};

export default EditStudent;
