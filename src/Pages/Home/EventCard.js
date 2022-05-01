import React, { useState } from "react";
import { Clear, ModalContainer, StyledModal } from "../../App.element";
import ViewEvent from "../Admin/ViewEvent";
import ClearIcon from "@material-ui/icons/Clear";
import { ListTable, ListTableContainer, OperationButton } from "../TeacherStudent.element";
import VisibilityIcon from "@material-ui/icons/Visibility";



const EventCard = ({ events, func }) => {
    const eventList = events;
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
    }


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

export default EventCard;
