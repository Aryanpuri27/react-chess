import { Routes, Route, Navigate } from "react-router-dom";
import Board from "./component/board";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Lobby from "./component/lobby/loby";
export default function Pages() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState([]);
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const jwt = Cookies.get("jwt");
        console.log(jwt);
        const response = await axios.post(
          "http://localhost:4000/auth/protect",
          { jwt: jwt }
        );
        console.log(response.data);
        setUser(response.data.user);
        if (response.status !== 200) {
          <Navigate to={"/auth/login"} />;
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsLoading(false);
      }
    };

    // Call the authentication check function
    checkAuthentication();
  }, []);

  return (
    <Routes>
      <Route path="/" exact element={<Lobby user={user} setUser={setUser} />} />
      <Route path="/board" exact element={<Board user={user} />} />
    </Routes>
  );
}
