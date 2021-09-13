import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
    margin:0px;
    padding:0px;
    box-sizing:border-box;
    font-family:  "Poppins",sans-serif;
    font-size:12px;
    letter-spacing: 1px;
    @media screen and (max-width: 960px) {
    font-size:13px;
     
    }

}
h1{
  font-size:1.5rem;
}

a{
    text-decoration: none;
    color: black;
    margin:0.2rem;

    
}


button{
    border: none;
    outline: none;
    padding: 0.5rem 1rem;
}

th, td{
  vertical-align:center;
}

tr:hover{
  background-color:#EFEFEF;
}

::-webkit-scrollbar {
  width: .8rem;
}

/* Track */
::-webkit-scrollbar-track {
  background: inherit; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #8868F9; 
  border-radius:0.5rem;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: dodgerblue; 
}
`;
export const Input = styled.input`
   outline: none;
   border: 1px solid lightgrey;
   box-shadow: 0 0 2px lightgrey;
   background-color: white;
   height: 2rem;

   &:focus {
      /* background-color: white; */
      border: 1px solid #8b68ff;
   }
`;
export const TextArea = styled.textarea`
   padding: 0.5rem 1rem;
   outline: none;
   border: none;
   border: 1px solid lightgrey;
   box-shadow: 0 0 2px lightgrey;

   &:focus {
      background-color: white;
   }
`;

export default GlobalStyle;
