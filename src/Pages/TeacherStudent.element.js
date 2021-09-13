import styled from "styled-components";
import { Input } from "../Globalstyle";
import { Link } from "react-router-dom";

// Admin Home Page

export const ShowCaseContainer = styled.div`
   display: flex;
   flex-wrap: wrap;
   justify-content:space-between;
   margin: 1rem 3rem;
`;
export const HomeShowCase = styled.div`
   background-color: ${(props) => props.color};
   height: 10rem;
   width: 20rem;
   padding: 1rem;
   margin: 1rem;
   color: white;
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
   align-items: center;

   h1 {
      font-size: 4rem;
   }
`;
// Display
export const FilterContainer = styled.div`
   margin: 1rem;
   padding: 1rem 4rem;
   display: flex;
   justify-content: flex-end;
   align-items: center;
   background-color: white;
   border: 1px solid #f4f6f6;
   box-shadow: 0 2px 5px #f4f6f6;
   @media screen and (max-width: 960px) {
      padding: 1rem;
   }
`;
export const SearchInput = styled(Input)`
   width: 100%;
`;
export const Select = styled.select`
   width: 100%;
   outline: none;
   height: 2.5rem;
   border: 1px solid lightgrey;
   box-shadow: 0 0 2px lightgrey;
   background-color: white;
`;

export const ListTableContainer = styled.div`
   height: 60vh;
   overflow-y: scroll;
   margin: 0 1rem;
`;

export const ListTable = styled.table`
   table-layout: fixed;
   margin: auto;
   width: 100%;
   background-color: white;
   box-shadow: 0 0 5px lightgrey;
   border-collapse: collapse;

   td,
   th {
      font-size: 0.9rem;
      text-align: center;
      line-height: 2rem;
      border-bottom: 1px solid rgba(226, 226, 226, 0.707);
   }
   @media screen and (max-width: 960px) {
      table-layout: auto;
      text-align: left;
   }
`;
export const OperationButton = styled.button`
   color: ${(props) => props.color};
   background-color: white;
   padding: 0.3rem 0.3rem 0 0.3rem;
   margin: 0.3rem 0.3rem;
   cursor: pointer;
   @media screen and (max-width: 960px) {
      padding: 0.6rem;
      margin: 0rem;
   }
`;
export const DeleteButton = styled.button`
   background-color: white;
   color: ${(props) => props.color};
   /* margin: 0rem 0.5rem; */
   cursor: pointer;
   @media screen and (max-width: 960px) {
      margin: 0rem;
   }
`;

// Add Student
export const FormContainer = styled.div`
   min-height: 40vh;
   overflow-y: scroll;
   display: flex;
   justify-content: center;
   background-color: white;
   /* margin: 1rem; */
   @media screen and (max-width: 960px) {
      margin: 0rem;
      max-height: 80vh;
      overflow: scroll;
   }
`;
export const SForm = styled.form`
   width: 100%;
   display: flex;
   justify-content: center;
   flex-wrap: wrap;
`;
export const FormGroup = styled.div`
   margin: 0 1rem 1rem 1rem;
   display: flex;
   flex-direction: column;
   justify-content: center;
   width: 100%;
   color: black;
   @media screen and (max-width: 960px) {
      width: 100%;
   }
   span {
      font-size: 0.9rem;
   }
`;
export const RadioGroup = styled.div`
   display: flex;
`;
export const SInput = styled(Input)`
   width: 100%;
`;
export const RadioBtn = styled.div`
   margin: 1rem 1rem 1rem 0;
   align-items: center;

   input {
      margin-right: 0.5rem;
   }
`;

export const Submit = styled(SInput)`
   padding: 0.5rem 2rem;
   height: 3rem;
   background-color: #8b68ff;
   color: white;
   text-align: center;
   &:focus {
      background-color: #8b68ff;
      color: black;
   }
`;

export const ViewDetailsContainer = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 1rem;
`;

export const ViewTable = styled.table`
   background-color: white;
   width: 100%;
   td,
   th {
      font-size: 1.2rem;
      line-height: 3rem;
      vertical-align: top;
   }
   tr:hover {
      background-color: white;
   }
   td:nth-child(1) {
      width: 43%;
   }
`;
