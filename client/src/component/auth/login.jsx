import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  function handelEmail(e) {
    setEmail(e.target.value);
  }
  function handelPassword(e) {
    setPassword(e.target.value);
  }
  async function handleLogin(event) {
    event.preventDefault();
    console.log("inside");
    // useEffect(() => {
    try {
      const response = await axios.post("http://localhost:4000/auth/login", {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        console.log("Login successful");
        console.log(response);
        Cookies.set("jwt", response.data.jwt, { expires: 7 });
        navigate("/");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
    // });
  }

  // You can optionally call handleLogin on component mount
  // handleLogin();
  // }, [email, password]);

  return (
    <div className="w-1/2 h-screen formparent">
      <form className="flex flex-col text-left p-8">
        <img src="../Check.png" alt="logo" />
        <h1>Log in to your account</h1>
        <span>
          Not a member?{" "}
          <Link to="../signup" className="link">
            SignUp
          </Link>
        </span>
        <br></br>
        <label for="email" className="namelabel">
          Email address
        </label>
        <input
          type="email"
          name="email"
          className="name"
          id=""
          value={email}
          onChange={handelEmail}
        />
        <label for="email" className="namelabel">
          Password
        </label>
        <input
          type="password"
          name="password"
          className="name"
          value={password}
          onChange={handelPassword}
        />
        <div className="check">
          <div className="p-4 checkbox-container">
            <input type="checkbox" name="remember" className="check-input" />
            <label for="remember" className="checkbox-container-label">
              Remember me
            </label>
          </div>
          <Link to={"../forgotpassword"} className="p-4">
            Forgot password?
          </Link>
        </div>
        <button className="btn" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
}
