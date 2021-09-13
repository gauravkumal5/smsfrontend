import React from "react";
import Header from "../../Components/Header/Header";
import { HomeShowCase, ShowCaseContainer } from "../TeacherStudent.element";
const Home = () => {
   return (
      <>
         <ShowCaseContainer>
            <HomeShowCase color="#8b68ff">
               <h1>50</h1> Students
            </HomeShowCase>
            <HomeShowCase color="#A461FE ">
               <h1>15</h1> Teachers
            </HomeShowCase>
            <HomeShowCase color="#AC66F7 ">
               <h1>1</h1> Admin
            </HomeShowCase>
            <HomeShowCase color="#951FFD ">
               <h1>5</h1> Non-Teaching Staffs
            </HomeShowCase>
         </ShowCaseContainer>
      </>
   );
};

export default Home;
