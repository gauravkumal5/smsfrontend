import React from "react";
import { TaskContainer, Task } from "./TeacherProfile.element";

const TeacherHome = () => {
   return (
      <TaskContainer>
         <Task to="teacher/reports" color="#8b68ff">
            Reports
         </Task>
         <Task to="/teacher/generateReport" color="#A461FE ">
            Generate Report
         </Task>
      </TaskContainer>
   );
};

export default TeacherHome;

