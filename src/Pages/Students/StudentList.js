import Axios from "axios";
import { React, useState } from "react";
import { OperationButton, ListTableContainer, ListTable, DeleteButton } from "../TeacherStudent.element";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { store } from "react-notifications-component";
import { Clear, DialogBox, ModalContainer, StyledModal } from "../../App.element";
import ClearIcon from "@material-ui/icons/Clear";
import ViewStudent from "./ViewStudent";
import EditStudent from "./EditStudent";

const StudentList = ({ filter, func }) => {
   const studentList = filter;
   const access_token = localStorage.getItem("token");
   const [showModal, setShowModal] = useState(false);
   const [id, setId] = useState(0);
   const [opTitle, setOpTitle] = useState("");

   const show = () => {
      if (showModal === true) {
         setShowModal(false);
      } else {
         setShowModal(true);
      }
   };

   console.log(studentList);
   const checkTitle = () => {
      if (opTitle === "view") {
         return (
            <StyledModal showModal={showModal}>
               <ModalContainer>
                  <Clear color="#5DC5D9">
                     <h1>Student Info</h1>
                     <ClearIcon style={{ fontSize: "3rem" }} onClick={show} />
                  </Clear>
                  <ViewStudent id={id} />
               </ModalContainer>
            </StyledModal>
         );
      }
      if (opTitle === "edit") {
         return (
            <StyledModal showModal={showModal}>
               <ModalContainer>
                  <Clear color="#2E8B57">
                     <h1>Student Info</h1>
                     <ClearIcon style={{ fontSize: "3rem" }} onClick={show}  />
                  </Clear>
                  <EditStudent id={id} show={show} func={func}/>
               </ModalContainer>
            </StyledModal>
         );
      }
      if (opTitle === "delete") {
         return (
            <StyledModal showModal={showModal}>
               <DialogBox color="white">
                  <h1>Are you sure to delete?</h1>
                  <div>
                     <button onClick={show}>Cancel</button>
                     <button onClick={() => deleteStudent()} style={{ background: "red", color: "white" }}>
                        {" "}
                        Delete
                     </button>
                  </div>
               </DialogBox>
            </StyledModal>
         );
      }
   };
   const deleteStudent = () => {
      Axios.delete(`http://sms.test/api/admin/deleteStudent/${id}`, {
         headers: {
            Authorization: `bearer ${access_token}`,
         },
      })
         .then((res) => {
            store.addNotification({
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
            store.addNotification({
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
            func();
         });
   };
   const renderStudent = () => {
      if (!studentList) {
         return (
            <tr>
               <td colSpan="4" style={{ lineHeight: "10rem", fontSize: "3rem", backgroundColor: "lightgrey" }}>
                  {/* Loading.......... */}
               </td>
            </tr>
         );
      }
      if (studentList.length === 0) {
         return (
            <tr>
               <td colSpan="4" style={{ lineHeight: "10rem", fontSize: "3rem", backgroundColor: "lightgrey" }}>
                  Not available yet....
               </td>
            </tr>
         );
      }
      return studentList.map((students, index) => (
         <tr key={index}>
            <td>{students.roll_no}</td>
            <td>{students.name}</td>
            <td>{students.class}</td>
            <td>{students.address}</td>
            <td>{students.contact}</td>


            <td>
               <OperationButton
                  color="#8b68ff"
                  onClick={() => {
                     setOpTitle("view");
                     show();
                     setId(students.id);
                  }}>
                  <VisibilityIcon />
               </OperationButton>
               <OperationButton
                  color="#8b68ff"
                  onClick={() => {
                     setOpTitle("edit");
                     show();
                     setId(students.id);
                  }}>
                  <EditIcon />
               </OperationButton>
               <OperationButton
                  color="#8b68ff"
                  onClick={() => {
                     setOpTitle("delete");
                     show();
                     setId(students.id);
                  }}>
                  <DeleteOutlineOutlinedIcon />
               </OperationButton>
            </td>
         </tr>
      ));
   };

   return (
      <>
         <ListTableContainer>
            <ListTable>
               <thead>
                  <tr>
                     <th>Roll No</th>
                     <th>Name</th>
                     <th>Class</th>
                     <th>Address</th>
                     <th>Contact</th>
                     <th>Operations</th>
                  </tr>
               </thead>
               <tbody>{renderStudent()}</tbody>
            </ListTable>
         </ListTableContainer>
         {checkTitle()}
      </>
   );
};

export default StudentList;
