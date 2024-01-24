import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [confirmpassword, setConfirmPassword] = useState("");
  async function handleLogin(event) {
    event.preventDefault();
    // useEffect(() => {
    try {
      console.log("inside");
      const response = await axios.post("http://localhost:4000/auth/signup", {
        email: email,
        password: password,
        name: name,
        passwordConfirm: confirmpassword,
      });

      console.log(response);
      if (response.status === 200) {
        console.log("Login successful");
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
  return (
    <div className="w-1/2 h-screen formparent">
      <form className="flex flex-col text-left p-8">
        <img src="../Check.png" alt="logo" />
        <h1>Create new account</h1>
        <span>
          Already a member?{" "}
          <Link to="../login" className="link">
            login
          </Link>
        </span>
        <br></br>
        <label for="name" className="namelabel">
          Name
        </label>
        <input
          type="text"
          name="name"
          className="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label for="email" className="namelabel">
          Email address
        </label>
        <input
          type="email"
          name="email"
          className="name"
          id=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label for="password" className="namelabel">
          Password
        </label>
        <input
          type="password"
          name="password"
          className="name"
          id=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label for="confirmPassword" className="namelabel">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          className="name"
          id=""
          value={confirmpassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="btn" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
}
