import { useState } from "react";
import { toast } from "react-toastify";
import "../css/login.css";

function SignUp() {
  const [userEmail, setUserEmail] = useState({ email: "" });
  const [userName, setUserName] = useState({ name: "" });
  const [userPassword, setUserPassword] = useState({ password: "" });

  function showNotification(message, status = 'success') {
    const toastFunc = status === 'error' ? toast.error : toast.success;
  
    toastFunc(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }


  const addAuthUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/authsignup", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail.email,
          name: userName.name,
          password: userPassword.password,
        }),
      });
      if (response.status === 400) {
        showNotification("Age should not be less than 0", "error");
      }
      else if (!response.ok) {
        showNotification("Failed to add user.", "error");
      }
      else {
      const addedUser = await response.json();
      showNotification("user has been added!", "success");
      window.location = "/";
    }
    setUserEmail({ email: "" });
    setUserName({ name: "" });
    setUserPassword({ password: "" });
    } catch (err) {
      console.log(err.message);
      showNotification(err.message, "error");
    }
  };

  const handleChangeForEmail = (e) => {
    setUserEmail({ ...userEmail, email: e.target.value });
  };
  const handleChangeforName = (e) => {
    setUserName({ ...userName, name: e.target.value });
  };
  const handleChangeForPassword = (e) => {
    setUserPassword({ ...userPassword, password: e.target.value });
  };

  return (
    <form className="loginForm" onSubmit={addAuthUser}>
      <h2>Sign up </h2>
      <br></br>
      <label>Email:</label>
      <input
        type="text"
        name="email"
        placeholder="Email"
        value={userEmail.email}
        onChange={handleChangeForEmail}
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
        <button type="submit"
        >
          Sign up
        </button>
    </form>
  );
}

export default SignUp;
