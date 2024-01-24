import "./header.css";
import Openent from "./openent";
export default function Header({ user }) {
  return (
    <header>
      <nav>
        <div>
          <img src="headerlogo.png" alt="logo" />
        </div>
        <div className="oppdiv">
          <Openent user={user} />
        </div>
      </nav>
    </header>
  );
}
