import Axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "../../Components/Header/Header";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { FormContainer, SForm, SInput, FormGroup, Submit, Select } from "../TeacherStudent.element";
import { TextArea } from "../../Globalstyle";
import Moment from "moment";
import { store } from "react-notifications-component";

const EditEvent = ({ id }) => {
   const access_token = localStorage.getItem("token");
   const [eventInfo, setEventInfo] = useState({
      title: "",
      eventType: "",
      startEventDate: "",
      endEventDate: "",
      eventDescription: "",
   });
   const [eventInfos, setEventInfos] = useState({
      title: " ",
      eventType: " ",
      startEventDate: " ",
      endEventDate: " ",
      eventDescription: " ",
   });
   let date = new Date();
   date = Moment(date).format("YYYY-MM-DD");

   useEffect(async () => {
      setEventInfo(eventInfos);
      Axios.get(`http://sms.test/api/admin/getEvent/${id}`, {
         headers: {
            Authorization: `bearer ${access_token}`,
         },
      }).then((res) => {
         const result = res.data.data;
         setEventInfo(result);
      });
   }, [id]);

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const res = await Axios.put(`http://sms.test/api/admin/updateEvent/${id}`, eventInfo, {
            headers: {
               Authorization: `bearer ${access_token}`,
            },
         });

         store.addNotification({
            title: "Updated",
            message: " Details are updated",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__slideInRight"],
            animationOut: ["animate__animated", "animate__slideOutRight"],
            dismiss: {
               duration: 2500,
            },
         });
      } catch {
         store.addNotification({
            title: "Failed",
            message: "Failed to update  details",
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__slideInRight"],
            animationOut: ["animate__animated", "animate__slideOutRight"],
            dismiss: {
               duration: 2500,
            },
         });
      }
   };
   const handleChange = async (e) => {
      setEventInfo({
         ...eventInfo,
         [e.target.name]: e.target.value,
      });
   };
   return (
      <>
         <FormContainer>
            <SForm onSubmit={handleSubmit}>
               <FormGroup>
                  <span> Event Title</span>
                  <SInput type="text" name="title" value={eventInfo.title} onChange={handleChange} required />
               </FormGroup>
               <FormGroup>
                  <div>
                     <span> Event Type</span>
                  </div>
                  <Select name="eventType" value={eventInfo.eventType} onChange={handleChange} required>
                     <option value="">Select</option>
                     <option value="Notice">Notice</option>
                     <option value="Interactive">Interactive</option>
                  </Select>
               </FormGroup>
               <FormGroup>
                  <span> Event Start Date</span>
                  <SInput type="date" value={eventInfo.startEventDate} name="startEventDate" onChange={handleChange} />
               </FormGroup>
               <FormGroup>
                  <span> Event End Date</span>
                  <SInput type="date" value={eventInfo.endEventDate} name="endEventDate" onChange={handleChange} />
               </FormGroup>
               <FormGroup>
                  <div>
                     <span> Description</span>
                  </div>
                  <TextArea
                     name="eventDescription"
                     value={eventInfo.eventDescription}
                     onChange={handleChange}
                     placeholder="Write some description, if any ?"
                     cols="40"
                     rows="5"
                     required
                  />
               </FormGroup>
               <Submit value="Submit" type="submit" />
            </SForm>
         </FormContainer>
      </>
   );
};

export default EditEvent;
