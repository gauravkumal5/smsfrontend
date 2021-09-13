import GroupIcon from "@material-ui/icons/Group";
import HomeIcon from "@material-ui/icons/Home";
import SubjectIcon from "@material-ui/icons/Subject";
import EventIcon from "@material-ui/icons/Event";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";

export const SidebarAdminData = [
   {
      title: "Home",
      path: "/dashboard",
      icon: <HomeIcon />,
   },
   {
      title: "Students",
      path: "/dashboard/students",
      icon: <GroupIcon />,
   },
   {
      title: "Teachers",
      path: "/dashboard/teachers",
      icon: <SupervisedUserCircleIcon />,
   },
   {
      title: "Class Teacher",
      path: "/dashboard/classTeachers",
      icon: <SupervisedUserCircleIcon />,
   },
   {
      title: " Subject Teacher ",
      path: "/dashboard/assignSubject",
      icon: <SubjectIcon />,
   },
   {
      title: "Subjects",
      path: "/dashboard/subjects",
      icon: <SubjectIcon />,
   },

   {
      title: "Events",
      path: "/dashboard/events",
      icon: <EventIcon />,
   },
];
