import styled from "styled-components";
import { Link } from "react-router-dom";
import { FormContainer, FormGroup, Select, SForm } from "../TeacherStudent.element";
import { Input } from "../../Globalstyle";

export const TaskContainer = styled.div`
   display: flex;
   height: 90vh;
   justify-content: center;
   align-items: center;
   flex-wrap: wrap;
`;
export const Task = styled(Link)`
   display: flex;
   justify-content: center;
   align-items: center;
   margin: 0.5rem 1rem;
   padding: 4rem 7rem;
   height: 12rem;
   width: 20rem;
   background-color: ${(props) => props.color};
   color: white;
   font-size: 1.2rem;
   border-radius: 5px;

   @media screen and (max-width: 768px) {
      height: 5rem;
      width: 8rem;
      font-size: 1rem;
      padding: 4rem;
      border-radius: 5px;
   }
`;

//Generate Report

export const ReportForm = styled.form`
   display: flex;

   background-color: white;
`;
//container for common data
export const CommonContainer = styled.div`
   display: flex;
   flex-direction: column;
   height: inherit;
   @media screen and (min-width: 767px) {
      /* width: 30%; */
      box-shadow: 1px 1px 5px lightgrey;
   }
`;

export const MarksContainer = styled.div`
   display: flex;
   /* @media screen and (max-width: 960px) {
      flex-wrap: wrap;
   } */
`;
export const ReportFormGroup = styled(FormGroup)`
   width: 80%;
`;
export const ReportInfo = styled.div`
   display: flex;
   flex-wrap: wrap;
   width: 50%;
   justify-content: center;
   margin: auto;
`;
export const ReportTable = styled.table`
   /* width: 100%; */
   margin: 0 1rem;
   padding: 0 1rem;
   border-collapse: collapse;
   text-align: center;
   background-color: white;
   box-shadow: 1px 1px 5px lightgrey;
   th,
   td {
      padding: 0.5rem 1rem;
   }
   th {
      box-shadow: 0px 0px 2px #8b68ff;
   }
   tr:hover {
      background-color: LightYellow;
   }
`;

export const AddButton = styled.button`
   background-color: DodgerBlue;
   color: white;
   font-size: 1.2rem;
`;

export const RemoveButton = styled.button`
   background-color: OrangeRed;
   color: white;
   font-size: 1.2rem;
`;
export const SSelect = styled(Select)`
   height: 2rem;
`;

//Report View

export const ReportViewContainer = styled.div`
   padding: 1rem 2rem;
   height: 100%;
   display: flex;
   align-items: center;

   @media print {
      * {
         font-family: sans-serif;
      }
      @page {
         size: 200mm 290mm;
      }

      .view {
         border: 1px solid black;
         padding: 2rem;
      }

      td,
      th {
         line-height: 1.5rem;
      }
   }
`;

export const ReportView = styled.div`
   background-color: white;
   text-align: center;
   overflow-y: scroll;

   @media screen and (max-width: 767px) {
      h1,
      h2 {
         margin-bottom: 0.5rem;
      }
      h1 {
         font-size: 1.3rem;
      }
      h2 {
         font-size: 1.1rem;
      }
   }
   h1,
   h2 {
      margin-bottom: 0.5rem;
   }
   h2 {
      font-size: 1.2rem;
   }

   @media screen and (min-width: 767px) {
      height: 70vh;
   }
`;

export const StudentInfo = styled.div`
   display: flex;
   justify-content: space-between;
   flex-wrap: nowrap;

   div {
      display: flex;
   }
   div > p {
      margin: 0 1rem;
   }
`;
export const MarksTable = styled.table`
   border-collapse: collapse;
   /* width: 100%; */
   background-color: white;
   td,
   th {
      border: 1px solid black;
      font-weight: normal;
      border-spacing: 0rem;
      padding: 0 0.5rem;
      line-height: 1.5rem;
   }
   td:nth-child(2) {
      text-align: left;
   }
`;
export const TH = styled.th`
   width: 100%;
`;
export const TFoot = styled.tfoot`
   border: 1px solid white;
   tr {
      border: 1px solid black;
   }
   td {
      border: none;
   }
`;

export const GradeInfo = styled.table`
   margin-top: 1rem;
   border: 1px solid black;
   width: 70%;
   border-collapse: collapse;

   td,
   th {
      border: 1px solid black;
      font-weight: normal;
      border-spacing: 0rem;
      padding: 0.2rem;
      line-height: 1.5rem;
   }
   td:nth-child(2) {
      text-align: left;
   }
   td:nth-child(5) {
      text-align: left;
   }
`;
export const AttendanceTable = styled.table`
   margin: 1rem;
   border-collapse: collapse;
   width: 25%;
   td,
   th {
      font-weight: normal;
      border: 1px solid black;
      padding: 0.2rem;
      line-height: 1.5rem;
   }
`;
export const CommentSection = styled.span`
   display: flex;
   margin-top: 4rem;
   border: 1px dashed black;
   padding: 1.5rem;
`;
export const ApprovalSection = styled.table`
   margin-top: 5rem;
   table-layout: fixed;
   width: 100%;
   border-spacing: 1rem;
`;
export const TD = styled.td`
   border-top: 1px solid black;
   padding: 0.5rem;
`;
