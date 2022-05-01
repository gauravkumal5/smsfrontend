import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import {
   DeleteButton,
   FormGroup,
   ListTable,
   ListTableContainer,
   OperationButton,
   SForm,
   SInput,
   Submit,
} from "../TeacherStudent.element";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";

import { DialogBox, StyledModal } from "../../App.element";
import { Store } from "react-notifications-component";

// Alternate way to use classes without prefix like `animated fadeIn`

const Subjects = () => {
   const [subject, setSubject] = useState({
      subjectName: "",
   });
   const [subjectList, setSubjectList] = useState();

   const access_token = localStorage.getItem("token");
   const [showModal, setShowModal] = useState(false);
   const [id, setId] = useState(0);

   //add Subject
   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const res = await axios.post(`http://sms.test/api/admin/addSubject`, subject, {
            headers: {
               Authorization: `Bearer ${access_token}`,
            },
         });

         console.log(res);
         fetchSubject();
         Store.addNotification({
            title: "Stored",
            message: "Subject stored successfully",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__slideInRight"],
            animationOut: ["animate__animated", "animate__slideOutRight"],
            dismiss: {
               duration: 2500,
            },
         });
      } catch {
         Store.addNotification({
            title: "Failed",
            message: "Failed to add a subject",
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
   const handleChange = async (e) => {
      setSubject({
         ...subject,
         [e.target.name]: e.target.value,
      });
   };

   //Get Subjects
   const fetchSubject = async () => {
      await axios
         .get(`http://sms.test/api/getSubjects`, {
            headers: {
               Authorization: `bearer ${access_token}`,
            },
         })
         .then((res) => {
            const result = res.data;
            setSubjectList(result.data);
         });
   };

   useEffect(() => {
      fetchSubject();
   }, []);

   console.log(subjectList);

   const show = () => {
      if (showModal === true) {
         setShowModal(false);
      } else {
         setShowModal(true);
      }
   };

   const deleteSubject = () => {
      axios
         .delete(`http://sms.test/api/admin/deleteSubject/${id}`, {
            headers: {
               Authorization: `bearer ${access_token}`,
            },
         })
         .then((res) => {
            Store.addNotification({
               title: "Deleted",
               message: ` Details deleted successfully`,
               type: "danger",
               insert: "top",
               container: "top-right",
               animationIn: ["animate__animated", "animate__slideInRight"],
               animationOut: ["animate__animated", "animate__slideOutRight"],
               dismiss: {
                  duration: 2500,
               },
            });
         })
         .catch((err) => {
            Store.addNotification({
               title: "Failed",
               message: `Failed  to delete`,
               type: "danger",
               insert: "top",
               container: "top-right",
               animationIn: ["animate__animated", "animate__slideInRight"],
               animationOut: ["animate__animated", "animate__slideOutRight"],
               dismiss: {
                  duration: 2500,
               },
            });
         })
         .finally(() => {
            show();
            fetchSubject();
         });
   };

   //render
   const renderSubject = () => {
      if (!subjectList) {
         return (
            <tr>
               <td colSpan="3">Loading ....</td>
            </tr>
         );
      }
      if (subjectList.length === 0) {
         return (
            <tr>
               <td colSpan="3">Not available yet....</td>
            </tr>
         );
      }

      return subjectList.map((subject, index) => (
         <tr key={index}>
            <td>{++index}</td>
            <td>{subject.name}</td>
            <td>
               <OperationButton
                  color="#8b68ff"
                  onClick={() => {
                     show();
                     setId(subject.id);
                  }}>
                  <DeleteOutlineOutlinedIcon />
               </OperationButton>
            </td>
         </tr>
      ));
   };

   return (
      <>
         <Header title="Subjects" />
         <SForm onSubmit={handleSubmit}>
            <div style={{ display: "flex" }}>
               <FormGroup>
                  <span> Subject Name</span>
                  <SInput type="text" name="subjectName" value={subject.subjectName} onChange={handleChange} />
               </FormGroup>
               <FormGroup>
                  <Submit
                     style={{ width: "100%", height: "2.2rem", marginTop: "1.3rem" }}
                     value="Submit"
                     type="submit"
                  />
               </FormGroup>
            </div>
         </SForm>
         <ListTableContainer>
            <ListTable>
               <thead>
                  <tr>
                     <th>SN</th>
                     <th>Subject Name</th>
                     <th>OP</th>
                  </tr>
               </thead>
               <tbody>{renderSubject()}</tbody>
            </ListTable>
         </ListTableContainer>
         <StyledModal showModal={showModal}>
            <DialogBox color="white">
               <h1>Are you sure to delete?</h1>
               <div>
                  <button onClick={show}>Cancel</button>
                  <button onClick={() => deleteSubject()} style={{ background: "red", color: "white" }}>
                     {" "}
                     Delete
                  </button>
               </div>
            </DialogBox>
         </StyledModal>
      </>
   );
};

export default Subjects;
