import { useState, SyntheticEvent } from "react";
import axios from "axios";
import { USER_ERRORS } from "../../errors";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Auth() {
  return (
    <div className="auth">
      <Register /> <Login />
    </div>
  );
}

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3000/user/register", {
        username,
        password,
      });
      alert("User registered");
      console.log(username, password);
    } catch (error) {
      console.log(error);
      if (error.response.data.type === USER_ERRORS.USER_ALREADY_EXISTS) {
        alert("ERROR :: Username already exists");
      } else {
        alert("ERROR :: Something went wrong");
      }
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // cookies
  const [_, setCookies] = useCookies(["access_token"]);

  // navigate
  const navigate = useNavigate();

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const result = await axios.post("http://localhost:3000/user/login", {
        username,
        password,
      });
      setCookies("access_token", result.data.access_token);
      localStorage.setItem("userID", result.data.userID);
      alert("User registered");
      // console.log(username, password);

      navigate("/");
    } catch (error) {
      console.log(error);

      let errorMsg: string = "";
      switch (error.response.data.type) {
        case USER_ERRORS.USER_NOT_FOUND:
          errorMsg = "User not found";
          break;
        case USER_ERRORS.INCORRECT_CREDENTIALS:
          errorMsg = "Incorrect credentials";
          break;

        default:
          errorMsg = "Something went wrong";
          break;
      }

      alert(`Error :: ${errorMsg}`);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Auth;
