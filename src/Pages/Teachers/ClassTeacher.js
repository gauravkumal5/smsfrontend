import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import {
   DeleteButton,
   FormGroup,
   ListTable,
   ListTableContainer,
   Select,
   SForm,
   Submit,
} from "../TeacherStudent.element";
import { store } from "react-notifications-component";

const ClassTeacher = () => {
   //getting TeachersList
   const [teachers, setTeachers] = useState([]);

   //setting ClassTeacherList
   const [classTeachers, setClassTeachers] = useState({
      teacher_id: "",
      class: "",
   });
   // Getting  Class teacherList
   const [classteacherList, setClassteacherList] = useState();

   const access_token = localStorage.getItem("token");

   //Get Teachers
   const fetchTeachers = async () => {
      await axios
         .get("http://sms.test/api/teacherList", {
            headers: {
               Authorization: `bearer ${access_token}`,
            },
         })
         .then((res) => {
            const result = res.data.data;
            setTeachers(result);
         });
   };
   useEffect(() => {
      fetchTeachers();
   }, []);

   //

   const handleChange = async (e) => {
      setClassTeachers({
         ...classTeachers,
         [e.target.name]: e.target.value,
      });
   };
   //
   const options = () => {
      return teachers.map((teacher, index) => (
         <option key={index} value={teacher.id}>
            {teacher.name}
         </option>
      ));
   };

   //
   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const res = await axios.post(`http://sms.test/api/admin/addClassTeacher`, classTeachers, {
            headers: {
               Authorization: `bearer ${access_token}`,
            },
         });

         fetchTeacher();
         store.addNotification({
            title: "Stored",
            message: "Class Teacher added successfully",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__slideInRight"],
            animationOut: ["animate__animated", "animate__slideOutRight"],
            dismiss: {
               duration: 5000,
            },
         });
      } catch {
         store.addNotification({
            title: "Failed",
            message: "Failed to add a Class Teacher",
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
   //
   //Get ClassTeacher
   const fetchTeacher = async () => {
      await axios
         .get(`http://sms.test/api/admin/getClassTeacher`, {
            headers: {
               Authorization: `bearer ${access_token}`,
            },
         })
         .then((res) => {
            const result = res.data;
            setClassteacherList(result.data);
         });
   };

   useEffect(() => {
      fetchTeacher();
   }, []);

   const renderTeacher = () => {
      if (!classteacherList) {
         return (
            <tr>
               <td colSpan="3">Loading ....</td>
            </tr>
         );
      }
      if (classteacherList.length === 0) {
         return (
            <tr>
               <td colSpan="3">Not available yet....</td>
            </tr>
         );
      }

      return classteacherList.map((teacher, index) => (
         <tr key={index} className="animate__animated animate__fadeIn   ">
            <td>{++index}</td>
            <td>{teacher.teachers.name}</td>
            <td>{teacher.class}</td>
            <td>
               <DeleteButton
                  color="tomato"
                  onClick={() => {
                     let r = window.confirm("Are you sure to delete ?");
                     if (r === true) {
                        axios
                           .delete(`http://sms.test/api/admin/deleteClassTeacher/${teacher.id}`, {
                              headers: {
                                 Authorization: `bearer ${access_token}`,
                              },
                           })
                           .then((res) => {
                              store.addNotification({
                                 title: "Deleted",
                                 message: ` Deleted successfully`,
                                 type: "danger",
                                 insert: "top",
                                 container: "top-right",
                                 animationIn: ["animate__animated", "animate__slideInRight"],
                                 animationOut: ["animate__animated", "animate__fadeOutRight"],
                                 dismiss: {
                                    duration: 3000,
                                 },
                              });
                           })
                           .then(fetchTeacher)
                           .catch((err) => {
                              store.addNotification({
                                 title: "Failed",
                                 message: "Failed to delete ",
                                 type: "danger",
                                 insert: "top",
                                 container: "top-right",
                                 animationIn: ["animate__animated", "animate__fadeIn"],
                                 animationOut: ["animate__animated", "animate__fadeOut"],
                                 dismiss: {
                                    duration: 3000,
                                 },
                              });
                           });
                     }
                  }}>
                  Delete
               </DeleteButton>
            </td>
         </tr>
      ));
   };

   return (
      <>
         <Header title="Class Teacher"  />
         <SForm onSubmit={handleSubmit} className="animate__animated animate__fadeIn   ">
            <FormGroup>
               <div>
                  <span> Teacher</span>
               </div>
               <Select name="teacher_id" value={classTeachers.teacher_id} onChange={handleChange} required>
                  <option value="">Select Teacher</option>
                  {options()}
               </Select>
            </FormGroup>
            <FormGroup>
               <div>
                  <span> Class</span>
               </div>
               <Select name="class" value={classTeachers.class} onChange={handleChange} required>
                  <option value="">Select Class</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
               </Select>
            </FormGroup>
            <FormGroup>
               <span style={{ visibility: "hidden " }}>hide</span>
               <Submit style={{ width: "100%", height: "3.1rem" }} value="Submit" type="submit" />
            </FormGroup>
         </SForm>
         <ListTableContainer>
            <ListTable>
               <thead>
                  <tr>
                     <th>SN</th>
                     <th>Teacher Name</th>
                     <th>Class</th>
                     <th>OP</th>
                  </tr>
               </thead>
               <tbody>{renderTeacher()}</tbody>
            </ListTable>
         </ListTableContainer>
      </>
   );
};

export default ClassTeacher;
