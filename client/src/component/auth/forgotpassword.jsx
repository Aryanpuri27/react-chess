import { Link } from "react-router-dom";
export default function forgotpassword() {
  return (
    <div className="w-1/2 h-screen formparent">
      <form className="flex flex-col text-left p-8">
        <img src="../Check.png" alt="logo" />
        <h1>Reset your password</h1>
        <span>
          Remember password?{" "}
          <Link to="../login" className="link">
            login
          </Link>
        </span>
        <br></br>
        <label for="email" className="namelabel">
          Email address
        </label>
        <input type="email" name="email" className="name" id="" />
        <label for="password" className="namelabel">
          New Password
        </label>
        <input type="password" name="password" className="name" id="" />
        <label for="confirmPassword" className="namelabel">
          Confirm New Password
        </label>
        <input type="password" name="confirmPassword" className="name" id="" />

        <button className="btn">Login</button>
      </form>
    </div>
  );
}
