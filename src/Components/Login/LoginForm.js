import React from "react";

const LoginForm = () => {
   return (
      <div>
         <form onSubmit={handleSubmit}>
            username
            <input type="text" name="email" value={authInfo.email} onChange={handleChange} />
            password
            <input type="text" name="password" value={authInfo.password} onChange={handleChange} />
            <button type="submit">Login</button>
         </form>
         <button type="button " onClick={localData}>
            Login
         </button>
      </div>
   );
};

export default LoginForm;
