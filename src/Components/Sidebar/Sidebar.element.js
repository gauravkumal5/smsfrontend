import styled from "styled-components";
import { Link } from "react-router-dom";
export const SidebarContainer = styled.div`
   @media screen and (max-width: 960px) {
      display: none;
      width: ${({ click }) => (click === 0 ? " 0%" : "100vw")};
      min-width: ${({ click }) => (click === 0 ? " 0px" : "500px")};
   }

   width: ${({ click }) => (click === 0 ? " 5%" : "20%")};
   min-width: ${({ click }) => (click === 0 ? "70px " : "200px")};

   height: 100vh;
   /* box-shadow: 2px 2px 2px lightgrey; */
   background-color: white;
   transition: 0.5s;
`;

export const Title = styled.div`
   margin-top: 1rem;
   text-align: center;
   font-size: 1.5rem;
   display: flex;
   justify-content: space-between;
`;
export const H1 = styled.h1`
   height: 20vh;
   padding: ${({ click }) => (click === 0 ? "1rem" : "2rem")};
   visibility: ${({ click }) => (click === 0 ? "hidden" : "")};
`;
export const HamBurg = styled.div`
   margin-right: ${({ click }) => (click === 0 ? " " : "-2rem")};
   margin-left: ${({ click }) => (click === 0 ? " -5.5rem" : "")};
   color: #8b68ff;
   z-index: 999;
   cursor: pointer;
   transition: 0.5s;
`;
export const SideNavbar = styled.ul`
   margin-top: 2rem;
   padding: 0px;
   display: flex;
   flex-direction: column;
   list-style: none;
`;
export const NavLink = styled(Link)`
   display: flex;
   align-items: center;
   width: 100%;
   padding: 1rem 0 1rem 2rem;
   color: #8b68ff;
`;
export const NavItem = styled.li`
   width: 100%;
   display: flex;
   flex-wrap: nowrap;
   justify-content: space-between;
   align-items: center;

   &:hover {
      background-color: lavender;
   }
`;
export const Span = styled.span`
   margin-left: 1rem;
   display: ${({ click }) => (click === 0 ? " none" : "")};
   color: black;
   white-space: nowrap;
   transition: all 1s;
`;
