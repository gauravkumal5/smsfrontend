import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

export const HeaderContainer = styled.div`
   margin: 1rem;
   height: 8vh;
   padding: 1rem;
   display: flex;
   justify-content: space-between;
   align-items: center;
   border-bottom: 1px solid lightgrey;
   box-shadow: 0 2px 5px lightgrey;
   background-color: white;
   h1 {
      color: #8868f9;
   }
`;
export const ActionButtonContainer = styled.div`
   display: flex;
   flex-wrap: nowrap;
   justify-content: flex-end;
   background-color: white;
   align-items: center;
`;

export const ActionButton = styled.button`
   padding: 0.8rem;
   font-size: 0.9rem;
   background-color: #8b68ff;
   color: white;
   display: flex;
   justify-content: flex-end;
   align-items: center;
   border-radius: 20px;
   span {
      margin-left: 1rem;
   }
`;

export const ActionLink = styled(Link)`
   padding: 0.5rem;
   font-size: 0.9rem;
   display: flex;
   span {
      margin-left: 1rem;
   }
`;
