import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EventList from "../Admin/EventList";
import { FilterContainer, Select } from "../TeacherStudent.element";
import EventCard from "./EventCard";

const WSEvent = () => {
    const [events, setEvents] = useState();
    const [filter, setFilter] = useState();
    const [showModal, setShowModal] = useState(false);
   const access_token = localStorage.getItem("token");


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
      }
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
              console.log(result);
              setEvents(result.data);
           });
     };
     const handleChange = async (e) => {
        setFilter(e.target.value);
     };
     useEffect(() => {
        fetchEvents();
     }, [filter]);

   return (
      <>
    <FilterContainer>
            <span>Filter By:</span>
            <Select style={{ width: "20%" }} value={filter} onChange={handleChange}>
               <option value="all">All</option>
               <option value="upcoming">Upcoming</option>
               <option value="ongoing">Ongoing</option>
               <option value="past">Past</option>
            </Select>
         </FilterContainer>
         <EventCard events={events} func={fetchEvents}/>

      </>
   );

};

export default WSEvent;
