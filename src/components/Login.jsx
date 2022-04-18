
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import { getLogin } from "../loginDetails/action";
import { useNavigate } from "react-router-dom";
import { userStatus } from "../Redux/auth/action";

export const Login = () => {
  const navigate = useNavigate();
  let dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  console.log(user);
  const [user1, setUser1] = useState({
    email: "",
    password: "",
  });
  function handleChange(e) {
    let { id, value } = e.target;
    setUser({ ...user, [id]: value });
  }
  function handleChange1(e) {
    console.log(e.target.value);
    let { name, value } = e.target;
    setUser1({ ...user1, [name]: value });
  }
  function handleSignUp() {
    axios
      .post("https://apartment-manager-system.herokuapp.com/register", user)
      .then((res) => {
        console.log(res.data.user._id);

        ////dispatch(getLogin(res.data.user._id));
        alert("registered sucessfully");
        setUser({
          email: "",
          password: "",
        });
        // navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert("User Alreay Exist Please Login");
        setUser({
          email: "",
          password: "",
        });
      });
  }

  function handleLogin() {
    axios
      .post("https://apartment-manager-system.herokuapp.com/login", user1)
      .then((res) => {
        console.log(res.data.user._id);
        // dispatch(getLogin(res.data.user._id));
        dispatch(userStatus({ payload: res.data, status: true }));
        alert("LoggedIn sucessfully");
        setUser1({
          email: "",
          password: "",
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert("Invalid Credentials");
        setUser1({
          email: "",
          password: "",
        });
      });
  }
  return (
    <>
      <h2>SignUp</h2>
      <input
        type="text"
        placeholder="Enter Email"
        id="email"
        value={user.email}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        id="password"
        value={user.password}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <br />
      <br />

      <button variant="contained" onClick={handleSignUp}>
        Submit
      </button>
      <hr />
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter Email"
        name="email"
        value={user1.email}
        onChange={(e) => {
          handleChange1(e);
        }}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={user1.password}
        onChange={(e) => {
          handleChange1(e);
        }}
      />
      <br />
      <br />
      <button variant="contained" onClick={handleLogin}>
        Submit
      </button>
    </>
  );
};