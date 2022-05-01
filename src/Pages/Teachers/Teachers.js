import Axios from "axios";
import React,{  useState, useEffect } from "react";
import Header from "../../Components/Header/Header";
import SearchBox from "../Admin/SearchBox";
import { FilterContainer, Select, SearchInput } from "../TeacherStudent.element";
import TeacherList from "./TeacherList";
import AddTeacher from "./AddTeacher";

import SearchSharpIcon from "@material-ui/icons/SearchSharp";
import CachedSharpIcon from "@material-ui/icons/CachedSharp";
import Pagination from "../Students/Pagination";
import { Clear, ModalContainer, StyledModal } from "../../App.element";
import ClearIcon from "@material-ui/icons/Clear";

const Teachers = () => {
   const [teachers, setTeachers] = useState(null);
   let [filterTeachers, setFilterTeachers] = useState();
   const [input, setInput] = useState("");

   const [currentPage, setCurrentPage] = useState(1);
   const [teachersPerPage, setTeachersPerPage] = useState(10);
   const [showModal, setShowModal] = useState(false);

   const access_token = localStorage.getItem("token");

   const fetchTeachers = () => {
      Axios.get("http://sms.test/api/teacherList", {
         headers: {
            Authorization: `bearer ${access_token}`,
         },
      }).then((res) => {
         const result = res.data;
         setTeachers(result.data);
      });
   };
   useEffect(() => {
      fetchTeachers();
   }, []);

   useEffect(async () => {
      setFilterTeachers(teachers);
   }, [teachers]);

   const onSubmit = (e) => {
      e.preventDefault();
      filterTeachers = teachers;
      if (!input) {
         console.log(input);
         setFilterTeachers(filterTeachers);
      } else if (input !== "") {
         console.log(input);
         let filter = filterTeachers;
         filter = filter.filter((teachers) => {
            return teachers.name.toLowerCase().includes(input.toLowerCase());
         });
         setFilterTeachers(filter);
      } else {
         // fetchStudents();
         console.log(input);
         setFilterTeachers(filterTeachers);
      }
   };
   const reloadData = () => {
      setFilterTeachers(teachers);
      setInput("");
      fetchTeachers();
   };
   const handleSearch = (e) => {
      setInput(e.target.value);
   };
   const show = () => {
      if (showModal === true) {
         setShowModal(false);
      } else {
         setShowModal(true);
      }
   };
   //get Current Students

   const indexOfLastTeacher = currentPage * teachersPerPage;
   const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
   let currentTeachers;
   if (!filterTeachers || filterTeachers.length === 0) {
      currentTeachers = filterTeachers;
   } else {
      currentTeachers = filterTeachers.slice(indexOfFirstTeacher, indexOfLastTeacher);
   }

   //change paginate
   const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
   };
   return (
      <div>
         <Header title="Teachers" show={show} />
         <FilterContainer>
            <form style={{ width: "80%", display: "flex", marginRight: "1rem" }} type="submit" onSubmit={onSubmit}>
               <SearchBox handleSearch={handleSearch} input={input} />
               <button style={{ backgroundColor: "#8b68ff", color: "white", marginRght: "1rem", height: "2.5rem" }}>
                  <SearchSharpIcon />
               </button>
            </form>
            <button
               style={{ backgroundColor: "#8b68ff", color: "white", marginRight: "1rem", height: "2.5rem" }}
               onClick={reloadData}>
               <CachedSharpIcon />
            </button>
         </FilterContainer>
         <div style={{ display: "flex", flexDirection: "column", height: "70vh" }}>
            <TeacherList teachers={currentTeachers} func={fetchTeachers} />
            <Pagination
               studentsPerPage={teachersPerPage}
               total={!filterTeachers ? 0 : filterTeachers.length}
               paginate={paginate}
            />
         </div>
         <StyledModal showModal={showModal}>
            <ModalContainer>
               <Clear color="#2E8B57">
                  <h1>Add Teachers</h1>
                  <ClearIcon style={{ fontSize: "3rem" }} onClick={show} />
               </Clear>
               <AddTeacher func={fetchTeachers} />
            </ModalContainer>
         </StyledModal>
      </div>
   );
};

export default Teachers;
