import React from "react";
import { HeaderContainer, ActionLink,DownloadButton, ActionButton, ActionButtonContainer } from "./Header.element";
import AddIcon from "@material-ui/icons/Add";
import DownloadIcon from '@material-ui/icons/CloudDownload';


const Header = ({ title, show }) => {
   const customRouteAdd = () => {
      if (title === "Students") {
         return (
            <ActionButtonContainer>
               <ActionLink>
                  
                     <span><i>&darr;</i></span>
               </ActionLink>
               <ActionButton
                  onClick={() => {
                     show();
                  }}>
                  <AddIcon />
               </ActionButton>
            </ActionButtonContainer>
         );
      } else if (title === "Teachers") {
         return (
            <ActionButtonContainer>
               <ActionButton
                  onClick={() => {
                     show();
                  }}>
                  <AddIcon />
               </ActionButton>
            </ActionButtonContainer>
         );
      } else if (title === "Events") {
         return (
            <ActionButtonContainer>
               <ActionButton
                  onClick={() => {
                     show();
                  }}>
                  <AddIcon />
               </ActionButton>
            </ActionButtonContainer>
         );
      } else if (title === "Class Teacher") {
         return (
            <ActionLink>
                  
            <span><i>&darr;</i>
            </span>
      </ActionLink>
         );
      } else if (title === "Reports") {
         return (
            <ActionButtonContainer>
               <ActionButton
                  onClick={() => {
                     show();
                  }}>
                  <AddIcon />
               </ActionButton>
            </ActionButtonContainer>
         );
      }
   };

   return (
      <HeaderContainer>
         <h1> {title}</h1>
         {customRouteAdd()}
      </HeaderContainer>
   );
};

export default Header;
