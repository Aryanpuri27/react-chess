import { useState } from "react";
import Header from "../Header";
import Add from "./addfriend";
import Side from "./side";

export default function Lobby({ user, setUser }) {
  const [friends, setFriends] = useState([]);
  const [invite, setInvite] = useState(null);

  return (
    <div className="">
      <Header user={user} />
      <div className="down">
        <Add
          friends={friends}
          setFriends={setFriends}
          user={user}
          setInvite={setInvite}
        />
        <div className="bg">
          <Side invite={invite} user={user} setUser={setUser} />
        </div>
      </div>
    </div>
  );
}
