import axios from "axios";
import React, { useEffect, useState } from "react";
import { BigModalContainer, Clear, ModalContainer, StyledModal } from "../../App.element";
import Header from "../../Components/Header/Header";
import { FilterContainer, Select } from "../TeacherStudent.element";
import MyStudents from "./MyStudents";

import ClearIcon from "@material-ui/icons/Clear";
import GenerateReport from "./GenerateReport";

const Reports = () => {
   const access_token = localStorage.getItem("token");
   const id = localStorage.getItem("id");
   const [students, setStudents] = useState([]);
   const [filter, setFilter] = useState("latest");
   const [showModal, setShowModal] = useState(false);

   let abs = "getLatestReports";
   const getFilter = () => {
      if (filter === "latest") {
         abs = "getLatestReports";
      } else if (filter === "past") {
         abs = "getPastReports";
      }
   };

   const fetchStudents = async () => {
      getFilter();
      await axios
         .get(`http://sms.test/api/${abs}/${id}`, {
            headers: {
               Authorization: `bearer ${access_token}`,
            },
         })
         .then((res) => {
            const result = res.data;
            setStudents(result.data);
         });
   };
   useEffect(() => {
      fetchStudents();
   }, [filter]);
   const handleChange = async (e) => {
      setFilter(e.target.value);
   };

   const show = () => {
      if (showModal === true) {
         setShowModal(false);
      } else {
         setShowModal(true);
      }
   };

   return (
      <>
         <Header title="Reports" show={show} />
         <FilterContainer>
            <span>Filter By:</span>
            <Select value={filter} onChange={handleChange}>
               <option value="latest">Latest</option>
               <option value="past">Past</option>
            </Select>
         </FilterContainer>
         <MyStudents students={students} func={fetchStudents} />
         <StyledModal showModal={showModal}>
            <BigModalContainer>
               <Clear>
                  <h1>Generate Report</h1>
                  <ClearIcon style={{ fontSize: "3rem" }} onClick={show} />
               </Clear>
               <GenerateReport />
            </BigModalContainer>
         </StyledModal>
      </>
   );
};
export default Reports;
