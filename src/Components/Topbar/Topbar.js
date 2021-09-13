import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TopbarContainer } from "./Topbar.element";
import { useHistory } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Clear, DialogBox, ModalContainer, StyledModal } from "../../App.element";
import ClearIcon from "@material-ui/icons/Clear";
import AdminProfileEdit from "../../Pages/Admin/AdminProfileEdit";
import { store } from "react-notifications-component";

const Topbar = () => {
   let history = useHistory();
   const [showModal, setShowModal] = useState(false);
   const [opTitle, setOpTitle] = useState("");

   const logout = (e) => {
      try {
         localStorage.clear();
         history.push("/login");
         store.addNotification({
            title: "Logout",
            message: ` Logged out successfully`,
            type: "info",
            insert: "center",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
               duration: 2000,
            },
         });
      } catch (err) {
         store.addNotification({
            title: "Failed",
            message: `Failed  to Log out`,
            type: "danger",
            insert: "center",
            container: "top-center",
            animationIn: ["animate__animated", "animate__slideInRight"],
            animationOut: ["animate__animated", "animate__slideOutRight"],
            dismiss: {
               duration: 2500,
            },
         });
      }
   };
   const checkTitle = () => {
      if (opTitle === "update") {
         return (
            <StyledModal showModal={showModal}>
               <ModalContainer>
                  <Clear color="#2E8B57">
                     <h1>Update Admin Details</h1>
                     <ClearIcon style={{ fontSize: "3rem" }} onClick={show} />
                  </Clear>
                  <AdminProfileEdit />
               </ModalContainer>
            </StyledModal>
         );
      }
      if (opTitle === "logout") {
         return (
            <StyledModal showModal={showModal}>
               <DialogBox color="white">
                  <h1 style={{ color: "black" }}>Are you sure to logout?</h1>
                  <div>
                     <button onClick={show}>Cancel</button>
                     <button onClick={() => logout()} style={{ background: "#5DC5D9", color: "white" }}>
                        {" "}
                        Logout
                     </button>
                  </div>
               </DialogBox>
            </StyledModal>
         );
      }
   };

   const show = () => {
      if (showModal === true) {
         setShowModal(false);
      } else {
         setShowModal(true);
      }
   };
   return (
      <TopbarContainer>
         <div>
            <button
               style={{ backgroundColor: "inherit" }}
               onClick={() => {
                  setOpTitle("update");
                  show();
               }}>
               <AccountCircleIcon style={{ color: " #8b68ff", fontSize: "2rem" }} />
            </button>
            <button
               style={{ backgroundColor: "inherit" }}
               onClick={() => {
                  setOpTitle("logout");
                  show();
               }}>
               <ExitToAppIcon style={{ color: "#8b68ff", fontSize: "2rem" }} />
            </button>
         </div>
         {checkTitle()}
      </TopbarContainer>
   );
};

export default Topbar;
