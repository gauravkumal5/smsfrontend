import Axios from "axios";
import React, { useEffect, useState } from "react";
import { ViewDetailsContainer, ViewTable } from "../TeacherStudent.element";

const ViewEvent = ({ id }) => {
   const access_token = localStorage.getItem("token");
   const [eventInfo, setEventInfo] = useState({
      title: "",
      eventType: "",
      startEventDate: "",
      endEventDate: "",
      eventDescription: "",
   });
   useEffect(() => {
      setEventInfo(" ");

      Axios.get(`http://sms.test/api/getEvent/${id}`, {
         headers: {
            Authorization: `bearer ${access_token}`,
         },
      }).then((res) => {
         const result = res.data.data;
         setEventInfo(result);
      });
   }, [id]);

   const check = () => {
      if (eventInfo.eventDescription === null) {
         return "No any description";
      } else {
         return eventInfo.eventDescription;
      }
   };
   return (
      <>
         <ViewDetailsContainer>
            <ViewTable>
               <tbody>
                  <tr>
                     <td>
                        <strong>Title</strong>
                     </td>
                     <td>{eventInfo.title}</td>
                  </tr>
                  <tr>
                     <td>
                        <strong>Type</strong>
                     </td>
                     <td>{eventInfo.eventType}</td>
                  </tr>
                  <tr>
                     <td>
                        <strong>Start Date</strong>
                     </td>
                     <td>{eventInfo.startEventDate}</td>
                  </tr>
                  <tr>
                     <td>
                        <strong>End Date</strong>
                     </td>
                     <td>{eventInfo.endEventDate}</td>
                  </tr>
                  <tr>
                     <td>
                        <strong>Description</strong>
                     </td>
                     <td>{check()}</td>
                  </tr>
               </tbody>
            </ViewTable>
         </ViewDetailsContainer>
      </>
   );
};

export default ViewEvent;
