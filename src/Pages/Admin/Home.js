import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import { HomeShowCase, ShowCaseContainer } from "../TeacherStudent.element";
const Home = () => {

   const [home, setHome] = useState({
      admin: "",
      user: "",
      teacher: "",
   });
   const access_token = localStorage.getItem("token");


   const fetch = async () => {
      await axios
         .get(`http://sms.test/api/getHome`, {
            headers: {
               Authorization: `bearer ${access_token}`,
            },
         })
         .then((res) => {
            const result = res.data;
            setHome(result);
            console.log(result);
         });
   };
   useEffect(() => {
      fetch();
   }, []);
   console.log(home);

   return (
      <>
         <ShowCaseContainer>
            <HomeShowCase color="#8b68ff">
               <h1>{home.user}</h1> Students
            </HomeShowCase>
            <HomeShowCase color="#A461FE ">
               <h1>{home.teacher}</h1> Teachers
            </HomeShowCase>
            <HomeShowCase color="#AC66F7 ">
               <h1>{home.admin}</h1> Admin
            </HomeShowCase>
            
         </ShowCaseContainer>
      </>
   );
};

export default Home;
