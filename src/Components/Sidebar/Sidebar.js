import React, { useEffect, useState } from "react";
import { NavItem, SideNavbar, Span, SidebarContainer, Title, NavLink, HamBurg, H1 } from "./Sidebar.element";
import MenuIcon from "@material-ui/icons/Menu";
import { SidebarAdminData } from "./SidebarData";

const Sidebar = () => {
   const [click, setClick] = useState(1);
   const toggleSidebar = () => {
      if (click === 0) {
         setClick(1);
      } else if (click === 1) {
         setClick(0);
      }
   };

   return (
      <SidebarContainer click={click}>
         <Title>
            <H1 click={click}>Janak Nath</H1>
            <HamBurg onClick={toggleSidebar} click={click}>
               <MenuIcon style={{ fontSize: "2rem" }} />
            </HamBurg>
         </Title>
         <SideNavbar>
            {SidebarAdminData.map((item, index) => {
               return (
                  <NavItem key={index}>
                     <NavLink to={item.path}>
                        {item.icon}
                        <Span click={click}>{item.title}</Span>
                     </NavLink>
                  </NavItem>
               );
            })}
         </SideNavbar>
      </SidebarContainer>
   );
};

export default Sidebar;
