import React, { useEffect, useState } from "react";
import { ListTable, ListTableContainer, OperationButton } from "../TeacherStudent.element";
import { Link } from "react-router-dom";
import { ActionButton, ActionButtonContainer } from "../../Components/Header/Header.element";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ClearIcon from "@material-ui/icons/Clear";
import { BigModalContainer, Clear, DialogBox, StyledModal } from "../../App.element";
import { store } from "react-notifications-component";
import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import ViewReport from "./ViewReport";
import UpdateReport from "./UpdateReport";

const MyStudents = ({ students, func }) => {
   const reports = students;
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
               <BigModalContainer>
                  <Clear color="#5DC5D9">
                     <h1>Report</h1>
                     <ClearIcon style={{ fontSize: "2rem" }} onClick={show} />
                  </Clear>
                  <ViewReport id={id} show={show} />
               </BigModalContainer>
            </StyledModal>
         );
      }
      if (opTitle === "edit") {
         return (
            <StyledModal showModal={showModal}>
               <BigModalContainer>
                  <Clear color="#2E8B57">
                     <h1>Student Info</h1>
                     <ClearIcon style={{ fontSize: "3rem" }} onClick={show} />
                  </Clear>
                  <UpdateReport id={id} show={show} />
               </BigModalContainer>
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
                     <button onClick={() => deleteReport()} style={{ background: "red", color: "white" }}>
                        {" "}
                        Delete
                     </button>
                  </div>
               </DialogBox>
            </StyledModal>
         );
      }
   };
   const deleteReport = () => {
      axios
         .delete(`http://sms.test/api/admin/deleteReport/${id}`, {
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
      return reports.map((report, index) => (
         <tr key={index}>
            <td>{++index}</td>
            <td>{report.name}</td>
            <td>{report.roll_no}</td>
            <td>{report.class}</td>
            <td>{report.term}</td>
            <td>
               <OperationButton
                  color="#8b68ff"
                  onClick={() => {
                     setOpTitle("view");
                     show();
                     setId(report.id);
                  }}>
                  <VisibilityIcon />
               </OperationButton>
               <OperationButton
                  color="#8b68ff"
                  onClick={() => {
                     setOpTitle("edit");
                     show();
                     setId(report.id);
                  }}>
                  <EditIcon />
               </OperationButton>
               <OperationButton
                  color="#8b68ff"
                  onClick={() => {
                     setOpTitle("delete");
                     show();
                     setId(report.id);
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
                     <th>SN</th>
                     <th>Name</th>
                     <th>Roll No</th>
                     <th>Class</th>
                     <th>Terminal</th>
                     <th>OP </th>
                  </tr>
               </thead>
               <tbody>{renderStudent()}</tbody>
            </ListTable>
         </ListTableContainer>
         {checkTitle()}
      </>
   );
};

export default MyStudents;
