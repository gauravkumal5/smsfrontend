import styled from "styled-components";

export const SAppContainer = styled.div`
   display: grid;
   height: 100vh;
   place-items: center;
   width: 100%;
`;
export const AppBody = styled.div`
   display: flex;
   width: 100%;
   background-color: #f5f5ff;
   position: relative;

   /* background-color: rgb(90, 238, 255); */
`;

export const DialogBox = styled.div`
   background-color: white;
   padding: 2rem;
   border-radius: 2rem;
   h1 {
      color: red;
      padding: 0 0 2rem 0;
   }
   div {
      display: flex;
      justify-content: space-between;
   }
`;

export const StyledModal = styled.div`
   position: absolute;
   z-index: 999;
   height: 100vh;
   width: 100%;
   top: 0rem;
   left: 0rem;
   /* display: grid; */
   display: ${({ showModal }) => (showModal === true ? "grid " : "none")};

   place-items: center;
   background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContainer = styled.div`
   padding: 1rem;
   background-color: white;
   width: 30%;
   border-radius: 2rem;
   @media screen and (max-width: 960px) {
      width: 100%;
   }
`;

export const BigModalContainer = styled.div`
   padding: 1rem;
   background-color: white;
   width: 60%;
   border-radius: 2rem;
   display: flex;
   flex-direction: column;
   min-height: 80vh;
   max-height: 100vh;
   @media screen and (max-width: 767px) {
      width: 100%;
      overflow-x: scroll;
      padding: 0;
      border-radius: 0;
   }
`;

export const Clear = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 0.5rem 1rem;
   color: #8b68ff;
`;
