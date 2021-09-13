import React from "react";
import { SearchInput } from "../TeacherStudent.element";

const SearchBox = ({ handleSearch, input }) => {
   return (
      <SearchInput style={{ width: "100%", height: "2.5rem" }} value={input} type="search" onChange={handleSearch} />
   );
};

export default SearchBox;
