import React from "react";

const Pagination = ({ studentsPerPage, total, paginate }) => {
   const pageNumbers = [];
   const dis = total < 10 ? "none" : "";
   for (let i = 1; i <= Math.ceil(total / studentsPerPage); i++) {
      pageNumbers.push(i);
   }

   return (
      <>
         <nav
            style={{
               backgroundColor: "white",
               padding: "0.5rem 0",
               boxShadow: "0px 0px 5px    #8868f9",
               margin: "1rem",
               display: `${dis}`,
            }}>
            <ul style={{ listStyle: "none", display: "flex", justifyContent: "flex-end" }}>
               {pageNumbers.map((number) => (
                  <li key={number}>
                     <a
                        onClick={() => paginate(number)}
                        style={{ border: "1px solid lightblue", padding: "0.5rem 1rem ", backgroundColor: "white" }}
                        href="#">
                        {number}
                     </a>
                  </li>
               ))}
            </ul>
         </nav>
      </>
   );
};

export default Pagination;
