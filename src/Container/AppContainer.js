import React  from "react";
import { SAppContainer, AppBody } from "../App.element";
import Sidebar from "../Components/Sidebar/Sidebar";
import { Switch } from "react-router-dom";
import Home from "../Pages/Admin/Home";
import Students from "../Pages/Students/Students";
import AddStudent from "../Pages/Students/AddStudent";
import Teachers from "../Pages/Teachers/Teachers";
import AddTeacher from "../Pages/Teachers/AddTeacher";
import PrivateRoute from "../Components/utils/PrivateRoute";
import { MainContainer } from "./MainContainer.element";
import Topbar from "../Components/Topbar/Topbar";
import AdminProfileEdit from "../Pages/Admin/AdminProfileEdit";
import ViewStudent from "../Pages/Students/ViewStudent";
import EditStudent from "../Pages/Students/EditStudent";
import Event from "../Pages/Admin/Event";
import ClassTeacher from "../Pages/Teachers/ClassTeacher";
import AddEvent from "../Pages/Admin/AddEvent";
import ViewEvent from "../Pages/Admin/ViewEvent";
import EditEvent from "../Pages/Admin/EditEvent";
import ViewTeacher from "../Pages/Teachers/ViewTeacher";
import EditTeacher from "../Pages/Teachers/EditTeacher";
import Subjects from "../Pages/Admin/Subjects";
import AssignSubjectClass from "../Pages/Admin/AssignSubjectClass";

const AppContainer = () => {
   return (
      <SAppContainer>
         <AppBody>
            <Sidebar />
            <MainContainer>
               <Topbar />
               <Switch>
                  <PrivateRoute path="/dashboard" exact={true} component={Home} />

                  <PrivateRoute path="/dashboard/students" exact={true} component={Students} />
                  <PrivateRoute path="/dashboard/addstudents" component={AddStudent} />
                  <PrivateRoute path="/dashboard/viewStudent/:id" component={ViewStudent} />
                  <PrivateRoute path="/dashboard/editStudent/:id" component={EditStudent} />

                  <PrivateRoute path="/dashboard/teachers" component={Teachers} />
                  <PrivateRoute path="/dashboard/addteachers" component={AddTeacher} />
                  <PrivateRoute path="/dashboard/viewteachers/:id" component={ViewTeacher} />
                  <PrivateRoute path="/dashboard/editTeachers/:id" component={EditTeacher} />

                  <PrivateRoute path="/dashboard/classTeachers" component={ClassTeacher} />

                  <PrivateRoute path="/dashboard/subjects" component={Subjects} />

                  <PrivateRoute path="/dashboard/events" component={Event} />
                  <PrivateRoute path="/dashboard/addEvents" component={AddEvent} />
                  <PrivateRoute path="/dashboard/viewEvent/:id" component={ViewEvent} />
                  <PrivateRoute path="/dashboard/editEvent/:id" component={EditEvent} />

                  <PrivateRoute path="/dashboard/assignSubject/" component={AssignSubjectClass} />

                  <PrivateRoute path="/dashboard/editProfile" component={AdminProfileEdit} />
               </Switch>
            </MainContainer>
         </AppBody>
      </SAppContainer>
   );
};

export default AppContainer;
