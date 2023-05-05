import { useState } from "react";
import { toast } from 'react-toastify';
import '../css/login.css'
import { Link } from "react-router-dom";

function LoginPage() {

  const [userEmail, setUserEmail] = useState({ email: "" });
  const [userName, setUserName] = useState({ name: "" });
  const [userPassword, setUserPassword] = useState({ password: "" });
  
  function showNotification(message, status = 'success') {
    const toastFunc = status === 'error' ? toast.error : toast.success;

    toastFunc(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }

  
  
  const AuthUser = async (e) => {
    e.preventDefault();
    
    try {
      // if(userEmail === "" || userName === "" || userPassword === "") {
      //   showNotification("Feilds should not be empty!",'error')
      // }else {
      
      const response = await fetch("http://localhost:3001/loginuser", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          email:userEmail.email,
          name: userName.name,
          password: userPassword.password,
        }),
      });
      setUserEmail({ email: "" });
      setUserName({ name: "" });
      setUserPassword({ password: "" });
      

      if (response.status === 400) {
        showNotification("user not found ", "error");
        
      }else if (!response.ok) {
          showNotification("Failed to find user.", "error");
        }
      else  {
        showNotification("Welcome!", "sucess");
        window.location = "/home";
      }
      
    }
     catch (err) {
      console.log(err.message);
      showNotification(err.message, "error");
    }
  }

  
  const handleChangeforEmail = (e) => {
    setUserEmail({ ...userEmail, email: e.target.value });
  };
  const handleChangeforName = (e) => {
    setUserName({ ...userName, name: e.target.value });
  };
  const handleChangeForPassword = (e) => {
    setUserPassword({ ...userPassword, password: e.target.value });
  };
  
  
  
  return (
    <form className="loginForm" onSubmit={AuthUser}>
      <h2>Login </h2><br></br>
      <label>Email:</label>
      <input
        type="email"
        name="useremail"
        placeholder="Email"
        value={userEmail.email}
        onChange={handleChangeforEmail}
        required
        />
      <br></br>
      <label>Username:</label>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={userName.name}
        onChange={handleChangeforName}
        required
        />
      <br></br>
      <label>Password:</label>
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={userPassword.password}
        onChange={handleChangeForPassword}
        required
        />

      <br></br>
      <button type="submit" >Log In</button>
      <br /><br />
      <Link to="/signup">Don't have an account? Sign up</Link>
    </form>
  );
  };


export default LoginPage;
