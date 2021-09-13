import Axios from "axios";
import { React, useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import SearchBox from "../Admin/SearchBox";
import { FilterContainer, Select, SearchInput } from "../TeacherStudent.element";
import Pagination from "./Pagination";
import StudentList from "./StudentList";
import SearchSharpIcon from "@material-ui/icons/SearchSharp";
import CachedSharpIcon from "@material-ui/icons/CachedSharp";
import Modal from "../../Components/Modal";
const Students = () => {
   const [students, setStudents] = useState();
   const access_token = localStorage.getItem("token");
   const [input, setInput] = useState("");
   let [filterStudents, setFilterStudents] = useState();
   const [studentClass, setStudentClass] = useState("All");
   const [currentPage, setCurrentPage] = useState(1);
   const [studentsPerPage, setStudentsPerPage] = useState(10);
   const [showModal, setShowModal] = useState(false);

   let abs = "admin/studentList";
   const getFilter = () => {
      if (studentClass === "All") {
         abs = "studentList";
      } else {
         abs = `getStudentsByClass/${studentClass}`;
      }
   };

   const setFilter = () => {
      setStudentClass("All");
   };

   const fetchStudents = async () => {
      getFilter();
      await Axios.get(`http://sms.test/api/admin/${abs}`, {
         headers: {
            Authorization: `bearer ${access_token}`,
         },
      }).then((res) => {
         const result = res.data;
         setStudents(result.data);
      });
   };
   useEffect(() => {
      fetchStudents();
   }, [studentClass]);

   useEffect(async () => {
      setFilterStudents(students);
   }, [students]);

   const onSubmit = (e) => {
      e.preventDefault();
      filterStudents = students;
      if (!input) {
         console.log(input);
         setFilterStudents(filterStudents);
      } else if (input !== "") {
         console.log(input);
         let filter = filterStudents;
         filter = filter.filter((student) => {
            return student.name.toLowerCase().includes(input.toLowerCase());
         });
         setFilterStudents(filter);
      } else {
         // fetchStudents();
         console.log(input);
         setFilterStudents(filterStudents);
      }
   };
   const reloadData = () => {
      setFilterStudents(students);
      setInput("");
      fetchStudents();
   };
   // useEffect(async () => {}, [input]);

   const handleChange = async (e) => {
      setStudentClass(e.target.value);
   };

   const handleSearch = (e) => {
      setInput(e.target.value);
   };

   //get Current Students

   const indexOfLastStudent = currentPage * studentsPerPage;
   const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
   let currentStudents;
   if (!filterStudents || filterStudents.length === 0) {
      currentStudents = filterStudents;
   } else {
      currentStudents = filterStudents.slice(indexOfFirstStudent, indexOfLastStudent);
   }

   //change paginate
   const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
   };
   const show = () => {
      if (showModal === true) {
         setShowModal(false);
      } else {
         setShowModal(true);
      }
   };

   return (
      <div>
         <Header title="Students" show={show} />
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
            <Select style={{ width: "20%" }} value={studentClass} onChange={handleChange}>
               <option value="All">All Class</option>
               <option value="1">Class 1</option>
               <option value="2"> Class 2</option>
               <option value="3"> Class 3</option>
               <option value="6"> Class 6</option>
               <option value="7"> Class 7</option>
            </Select>
         </FilterContainer>
         <div style={{ display: "flex", flexDirection: "column", height: "70vh" }}>
            <StudentList filter={currentStudents} func={fetchStudents} />
            <Pagination
               studentsPerPage={studentsPerPage}
               total={!filterStudents ? 0 : filterStudents.length}
               paginate={paginate}
            />
         </div>
         <Modal showModal={showModal} show={show} func={fetchStudents} setFilter={setFilter} />
      </div>
   );
};

export default Students;
