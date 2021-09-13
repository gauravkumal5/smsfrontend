import styled from "styled-components";
import { Input } from "../../Globalstyle";
import { SInput } from "../../Pages/TeacherStudent.element";

export const LoginContainer = styled.div`
   display: flex;
   height: 100vh;
   justify-content: center;
   align-items: center;
   color: white;
`;
export const LoginForm = styled.form`
   background-color: #8b68ff;
   padding: 3rem;
   border-radius: 2rem;
`;
export const LoginFormGroup = styled.div`
   margin: 1rem;
   display: flex;
   justify-content: space-between;

   div {
      display: flex;
      align-items: center;
   }
`;
export const LoginInput = styled(Input)`
   margin: 0rem 1rem;
   outline: none;
   border: none;
`;

export const LoginSubmit = styled(SInput)`
   margin-top: 1rem;
   height: 2.5rem;
   text-align: center;
   color: black;
   font-size: 1rem;
   border-radius: 2rem;
   &:focus {
      color: black;
   }
`;
