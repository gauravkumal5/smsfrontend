import axios from "axios";
import React, { useState } from "react";
import { OperationButton, ListTableContainer, ListTable, DeleteButton } from "../TeacherStudent.element";
import { store } from "react-notifications-component";
import { Clear, DialogBox, ModalContainer, StyledModal } from "../../App.element";
import ViewTeacher from "./ViewTeacher";
import EditTeacher from "./EditTeacher";
import ClearIcon from "@material-ui/icons/Clear";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";

const TeacherList = ({ teachers, func }) => {
   const teacherList = teachers;
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

   const checkTitle = () => {
      if (opTitle === "view") {
         return (
            <StyledModal showModal={showModal}>
               <ModalContainer>
                  <Clear>
                     <h1>Teachers Info</h1>
                     <ClearIcon style={{ fontSize: "3rem" }} onClick={show} />
                  </Clear>
                  <ViewTeacher id={id} />
               </ModalContainer>
            </StyledModal>
         );
      }
      if (opTitle === "edit") {
         return (
            <StyledModal showModal={showModal}>
               <ModalContainer>
                  <Clear>
                     <h1>Teachers Info</h1>
                     <ClearIcon style={{ fontSize: "3rem" }} onClick={show} />
                  </Clear>
                  <EditTeacher id={id} show={show} />
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
                     <button onClick={() => deleteTeacher(true)} style={{ background: "red", color: "white" }}>
                        {" "}
                        Delete
                     </button>
                  </div>
               </DialogBox>
            </StyledModal>
         );
      }
   };

   const deleteTeacher = () => {
      axios
         .delete(`http://sms.test/api/admin/deleteTeacher/${id}`, {
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

   const renderTeacher = () => {
      if (!teacherList) {
         return (
            <tr>
               <td colSpan="3">Loading Teachers.....</td>
            </tr>
         );
      }
      if (teacherList.length === 0) {
         return (
            <tr>
               <td colSpan="3">No Teachers available yet....</td>
            </tr>
         );
      }
      return teacherList.map((teachers, index) => (
         <tr key={index}>
            <td>{teachers.name}</td>
            <td>{teachers.address}</td>
            <td>{teachers.contact}</td>
            <td>
               <OperationButton
                  color="#8b68ff"
                  onClick={() => {
                     setOpTitle("view");
                     show();
                     setId(teachers.id);
                  }}>
                  <VisibilityIcon />
               </OperationButton>
               <OperationButton
                  color="#8b68ff"
                  onClick={() => {
                     setOpTitle("edit");
                     show();
                     setId(teachers.id);
                  }}>
                  <EditIcon />
               </OperationButton>
               <OperationButton
                  color="#8b68ff"
                  onClick={() => {
                     setOpTitle("delete");
                     show();
                     setId(teachers.id);
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
                     <th>Name</th>
                     <th>Address</th>
                     <th>Contact</th>
                     <th>Operations</th>
                  </tr>
               </thead>
               <tbody>{renderTeacher()}</tbody>
            </ListTable>
         </ListTableContainer>
         {checkTitle()}
      </>
   );
};

export default TeacherList;
