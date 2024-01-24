import { useEffect, useState } from "react";
// import Friend from "./friends";
import axios from "axios";
import Online from "./online";

export default function Friendssearch({ setFr, user, setInvite }) {
  const [search, setSearch] = useState([]);
  const [searchfriend, setFriendsfriend] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      console.log("br");
      try {
        // for (let i = 0; i < 6; i++) {
        const data = user._id;
        console.log("id", user._id);
        const response = await axios.post(
          "http://localhost:4000/auth/friends",
          {
            data: data,
          }
        );
        console.log("response");
        console.log(response);
        if (response) {
          setFriendsfriend(response.data.data);
          // break;
        }
        // }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };
    fetchData(); // Call the async function
  }, [user]); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div className="add-parent">
      <div className="input-parent">
        <div className="custom-search">
          <input
            type="search"
            name="search"
            placeholder="search in friends"
            autocomplete="off"
            // value={search}
            // onChange={setSearch((e) => e.target.value)}
          />
          <button className="search-button">
            <img src="search.png" alt="" srcset="" className="add-logo" />
          </button>
        </div>
        <button>
          <img
            src="add-user.png"
            alt=""
            srcset=""
            className="add-logo"
            onClick={() => setFr((e) => !e)}
          />
        </button>
      </div>
      <div className="hr"></div>
      {searchfriend.map((e) => (
        <Online data={e} setInvite={setInvite} />
      ))}
    </div>
  );
}
