import Axios from "axios";
import React,{ useState, useEffect } from "react";
import { FormContainer, SForm, FormGroup, SInput, Submit } from "../TeacherStudent.element";

export const StudentProfileEdit = () => {
   const access_token = localStorage.getItem("token");
   const id = localStorage.getItem("id");
   const [name, setName] = useState("");
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [reTypePassword, setReTypePassword] = useState("");

   const teacher = { name, username, password };
   useEffect(() => {
      Axios.get(`http://sms.test/api/user/getStudent/${id}`, {
         headers: {
            Authorization: `bearer ${access_token}`,
         },
      }).then((res) => {
         const result = res.data;
         setName(result.data.name);
         setUsername(result.data.username);
         // setPassword(result.data.password);
      });
   }, [access_token]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (password !== reTypePassword) {
         alert("Both password should be same");
      } else {
         try {
            const res = await Axios.put(`http://sms.test/api/user/updateStudent/${id}`, teacher, {
               headers: {
                  Authorization: `bearer ${access_token}`,
               },
            });

            if (res.status === 200) {
               alert(res.data.data);
               console.log(res.data);
               // history.push("/dashboard/students");
            } else {
               alert(res.data.data);
               console.log("Error");
            }
         } catch {
            alert("failed to Edit");
         }
      }
   };

   return (
      <FormContainer>
         <SForm>
            <FormGroup>
               <span> Full Name</span>
               <SInput type="text" onChange={(e) => setName(e.target.value)} value={name} required></SInput>
            </FormGroup>
            <FormGroup>
               <span> Username </span>
               <SInput type="text" onChange={(e) => setUsername(e.target.value)} value={username} required></SInput>
            </FormGroup>
            <FormGroup>
               <span> Password</span>
               <SInput type="password" onChange={(e) => setPassword(e.target.value)} value={password} required></SInput>
            </FormGroup>
            <FormGroup>
               <span> Re-type Password</span>
               <SInput
                  type="password"
                  onChange={(e) => setReTypePassword(e.target.value)}
                  value={reTypePassword}
                  required></SInput>
            </FormGroup>
            <Submit value="Submit" type="button" onClick={handleSubmit} />
         </SForm>
      </FormContainer>
   );
};
export default StudentProfileEdit;
