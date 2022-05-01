import ReactDOM from "react-dom";
import GlobalStyle from "./Globalstyle";
import React from "react";
import AppContainer from "./Container/AppContainer";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./Components/Login/Login";
import PrivateRoute from "./Components/utils/PrivateRoute";
import StudentLogin from "./Components/Login/StudentLogin";
import UserPrivateRoute from "./Components/utils/UserPrivateRoute";
import StudentProfile from "./Pages/StudentProfile/StudentProfile";
import TeacherProfile from "./Pages/TeacherProfile/TeacherProfile";
import TeacherPrivateRoute from "./Components/utils/TeacherPrivateRoute";
import {ReactNotifications} from "react-notifications-component";
import "animate.css/animate.min.css";
import "react-notifications-component/dist/theme.css";
import Modal from "./Components/Modal";
import WSHome from "./Pages/Home/WSHome";

const App = () => {
   return (
      <>
         <ReactNotifications />
         <GlobalStyle />
         <Router>
            <Switch>
               <Route path="/" exact={true} component={WSHome} />
               <Route path="/login" exact={true} component={Login} />
               <Route path="/studentlogin" exact={true} component={StudentLogin} />
               <PrivateRoute path="/dashboard" component={AppContainer} />
               <UserPrivateRoute path="/student" component={StudentProfile} />
               <TeacherPrivateRoute path="/teacher" component={TeacherProfile} />
            </Switch>
         </Router>
      </>
   );
};

export default App;
if (document.getElementById("app")) {
   ReactDOM.render(<App />, document.getElementById("app"));
}
