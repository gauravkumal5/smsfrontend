import React from "react";
import { Switch } from "react-router";
import { AppBody, SAppContainer } from "../../App.element";
import Topbar from "../../Components/Topbar/Topbar";
import { TopbarContainer } from "../../Components/Topbar/Topbar.element";
import TeacherPrivateRoute from "../../Components/utils/TeacherPrivateRoute";
import { MainContainer } from "../../Container/MainContainer.element";
import GenerateReport from "./GenerateReport";
import Reports from "./Reports";
import TeacherHome from "./TeacherHome";
import UpdateReport from "./UpdateReport";
import ViewReport from "./ViewReport";

const TeacherProfile = () => {
   return (
      <SAppContainer>
         <AppBody>
            <MainContainer>
               <Topbar />

               <Switch>
                  <TeacherPrivateRoute path="/teacher" exact={true} component={TeacherHome} />
                  <TeacherPrivateRoute path="/teacher/reports" component={Reports} />

                  <TeacherPrivateRoute path="/teacher/generateReport" component={GenerateReport} />
                  <TeacherPrivateRoute path="/teacher/viewReport/:id" component={ViewReport} />
                  <TeacherPrivateRoute path="/teacher/updateReport/:id" component={UpdateReport} />
               </Switch>
            </MainContainer>
         </AppBody>
      </SAppContainer>
   );
};

export default TeacherProfile;
