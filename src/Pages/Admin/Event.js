import axios from "axios";
import React, { useEffect, useState } from "react";
import { Clear, ModalContainer, StyledModal } from "../../App.element";
import Header from "../../Components/Header/Header";
import Modal from "../../Components/Modal";
import Pagination from "../Students/Pagination";
import { FilterContainer, ListTableContainer, Select } from "../TeacherStudent.element";
import EventList from "./EventList";
import AddEvent from "./AddEvent";

import ClearIcon from "@material-ui/icons/Clear";

const Event = () => {
   const [events, setEvents] = useState();
   const [filter, setFilter] = useState();
   const access_token = localStorage.getItem("token");

   const [currentPage, setCurrentPage] = useState(1);
   const [eventsPerPage] = useState(10);
   const [showModal, setShowModal] = useState(false);

   let abs = "getEvents";
   const getFilter = () => {
      if (filter === "all") {
         abs = "getEvents";
      } else if (filter === "upcoming") {
         abs = "getUpcoming";
      } else if (filter === "ongoing") {
         abs = "getOngoing";
      } else if (filter === "past") {
         abs = "getPast";
      } 
      // else if (filter === "recent") {
      //    abs = "getRecent";
      // }
   };

   const filters = () => {
      setFilter("All");
   };
   const fetchEvents = async () => {
      getFilter();
      await axios
         .get(`http://sms.test/api/${abs}`, {
            headers: {
               Authorization: `bearer ${access_token}`,
            },
         })
         .then((res) => {
            const result = res.data;
            setEvents(result.data);
         });
   };
   const handleChange = async (e) => {
      setFilter(e.target.value);
   };
   useEffect(() => {
      fetchEvents();
   }, [filter]);

   //get Current Students

   const indexOfLastEvent = currentPage * eventsPerPage;
   const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
   let currentEvents;
   if (!events || events.length === 0) {
      currentEvents = events;
   } else {
      currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
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
      <>
         <Header title="Events" show={show} />
         <FilterContainer>
            <span>Filter By:</span>
            <Select style={{ width: "20%" }} value={filter} onChange={handleChange}>
               <option value="all">All</option>
               <option value="upcoming">Upcoming</option>
               <option value="ongoing">Ongoing</option>
               <option value="past">Past</option>
            </Select>
         </FilterContainer>
         <ListTableContainer>
            <EventList events={currentEvents} func={fetchEvents} />
         </ListTableContainer>
         <Pagination studentsPerPage={eventsPerPage} total={!events ? 0 : events.length} paginate={paginate} />
         <StyledModal showModal={showModal}>
            <ModalContainer>
               <Clear color="#2E8B57">
                  <h1>Add Event</h1>
                  <ClearIcon style={{ fontSize: "3rem" }} onClick={show} />
               </Clear>
               <AddEvent func={fetchEvents} filters={filters} />
            </ModalContainer>
         </StyledModal>
      </>
   );
};

export default Event;
