import axios from "axios";
import { useState } from "react";
import Friendssearch from "./search";
import Onlinesearch from "./onlinesearch";

export default function Add({ friends, user, setInvite }) {
  const [fr, setFr] = useState(true);
  console.log(user);
  if (fr) {
    return <Friendssearch setFr={setFr} user={user} setInvite={setInvite} />;
  }
  return <Onlinesearch setFr={setFr} user={user} />;
}
