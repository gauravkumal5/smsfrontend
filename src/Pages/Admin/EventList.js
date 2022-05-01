import axios from "axios";
import React, { useState } from "react";
import { DeleteButton, ListTable, ListTableContainer, OperationButton } from "../TeacherStudent.element";
import { Store } from "react-notifications-component";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import ClearIcon from "@material-ui/icons/Clear";
import { Clear, DialogBox, ModalContainer, StyledModal } from "../../App.element";
import EditEvent from "./EditEvent";
import ViewEvent from "./ViewEvent";

const EventList = ({ events, func }) => {
   const eventList = events;
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
                     <h1>Student Info</h1>
                     <ClearIcon style={{ fontSize: "3rem" }} onClick={show} />
                  </Clear>
                  <ViewEvent id={id} />
               </ModalContainer>
            </StyledModal>
         );
      }
      if (opTitle === "edit") {
         return (
            <StyledModal showModal={showModal}>
               <ModalContainer>
                  <Clear>
                     <h1>Student Info</h1>
                     <ClearIcon style={{ fontSize: "3rem" }} onClick={show} />
                  </Clear>
                  <EditEvent id={id} show={show} />
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
                     <button onClick={() => deleteSubject()} style={{ background: "red", color: "white" }}>
                        {" "}
                        Delete
                     </button>
                  </div>
               </DialogBox>
            </StyledModal>
         );
      }
   };
   const deleteSubject = () => {
      axios
         .delete(`http://sms.test/api/admin/deleteEvent/${id}`, {
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
            func();
         });
   };

   const renderEvents = () => {
      if (!eventList) {
         return (
            <tr>
               <td colSpan="4">Loading Events....</td>
            </tr>
         );
      }
      if (eventList.length === 0) {
         return (
            <tr>
               <td colSpan="4">No Events available yet....</td>
            </tr>
         );
      }
      return eventList.map((events, index) => (
         <tr key={index}>
            <td>{events.title}</td>
            <td>{events.startEventDate}</td>
            <td>{events.endEventDate}</td>
            {/* <td>{events.eventType}</td> */}

            <td>
               <OperationButton
                  color="#8b68ff"
                  onClick={() => {
                     setOpTitle("view");
                     show();
                     setId(events.id);
                  }}>
                  <VisibilityIcon />
               </OperationButton>
               <OperationButton
                  color="#8b68ff"
                  onClick={() => {
                     setOpTitle("edit");
                     show();
                     setId(events.id);
                  }}>
                  <EditIcon />
               </OperationButton>
               <OperationButton
                  color="#8b68ff"
                  onClick={() => {
                     setOpTitle("delete");
                     show();
                     setId(events.id);
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
                     <th>Title</th>
                     <th>Start Date</th>
                     <th>End Date</th>
                     <th>Operations</th>

                  </tr>
               </thead>
               <tbody>{renderEvents()}</tbody>
            </ListTable>
         </ListTableContainer>
         {checkTitle()}
      </>
   );
};

export default EventList;
