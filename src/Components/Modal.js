import React from "react";
import styled from "styled-components";
import { Clear, ModalContainer, StyledModal } from "../App.element";
import AddStudent from "../Pages/Students/AddStudent";
import ClearIcon from "@material-ui/icons/Clear";

const Modal = ({ showModal, show, func, setFilter, title }) => {
   const add = () => {
      if (showModal === true) {
         return <AddStudent func={func} setFilter={setFilter} />;
      }
   };
   return (
      <>
         <StyledModal showModal={showModal} className="animate__animated animate__fadeIn  ">
            <ModalContainer>
               <Clear>
                  <h1>Add Student</h1>
                  <ClearIcon style={{ fontSize: "2rem" }} onClick={show} />
               </Clear>
               {add()}
               {/* <AddStudent func={func} /> */}
            </ModalContainer>
         </StyledModal>
      </>
   );
};

export default Modal;
