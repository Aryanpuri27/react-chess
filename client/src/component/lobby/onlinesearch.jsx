import axios from "axios";
import { useState } from "react";
import Friend from "./friends";

export default function Onlinesearch({ setFr, user }) {
  const [search, setSearch] = useState([]);
  const [searchfriend, setFriendsfriend] = useState([]);

  async function handelsearch(e) {
    setSearch(() => e.target.value);
    try {
      const response = await axios.post("http://localhost:4000/auth/search", {
        data: e.target.value,
      });
      // console.log(response);
      setFriendsfriend(response.data.data);
    } catch (error) {
      console.error("Error checking authentication:", error);
    }
  }
  return (
    <div className="add-parent">
      <div className="input-parent">
        <div className="custom-search">
          <input
            type="search"
            name="search"
            placeholder="add friends"
            autocomplete="off"
            value={search}
            onChange={handelsearch}
          />
          <button className="search-button">
            <img src="search.png" alt="" srcset="" className="add-logo" />
          </button>
        </div>
        <button onClick={() => setFr((e) => !e)}>
          <img src="add-user.png" alt="" srcset="" className="add-logo" />
        </button>
      </div>
      <div className="hr"></div>
      {searchfriend.map((e) => (
        <Friend data={e} user={user} />
      ))}
    </div>
  );
}
