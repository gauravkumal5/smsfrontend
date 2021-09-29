import Axios from "axios";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { FormContainer, SForm, SInput, FormGroup, Submit, Select } from "../TeacherStudent.element";
import { TextArea } from "../../Globalstyle";
import Header from "../../Components/Header/Header";
import Moment from "moment";
import { store } from "react-notifications-component";

const AddEvent = ({ func, filters }) => {
   const access_token = localStorage.getItem("token");
   let history = useHistory();
   const [eventInfo, setEventInfo] = useState({
      title: "",
      eventType: "",
      startEventDate: "",
      endEventDate: "",
      eventDescription: "",
   });
   let date = new Date();
   date = Moment(date).format("YYYY-MM-DD");
   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const res = await Axios.post(`http://sms.test/api/admin/addEvent`, eventInfo, {
            headers: {
               Authorization: `bearer ${access_token}`,
            },
         });
         filters();
         func();
         store.addNotification({
            title: "Updated",
            message: " Details are updated",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__slideInRight"],
            animationOut: ["animate__animated", "animate__slideOutRight"],
            dismiss: {
               duration: 3000,
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
               duration: 3000,
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
                     <option value="Participation">Participation</option>
                  </Select>
               </FormGroup>
               <FormGroup>
                  <span> Event Start Date</span>
                  <SInput type="date" name="startEventDate" min={date} onChange={handleChange} />
               </FormGroup>
               <FormGroup>
                  <span> Event End Date</span>
                  <SInput type="date" name="endEventDate" min={eventInfo.startEventDate} onChange={handleChange} />
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
                     id=""
                     cols="30"
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

export default AddEvent;
