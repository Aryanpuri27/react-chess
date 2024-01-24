import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import socketIO from "socket.io-client";
let id = "";
export default function Side({ invite, user, setUser }) {
  const [isinvited, setIsinvited] = useState(false);

  const navigate = useNavigate();
  const socket = socketIO.connect("http://localhost:4000");
  socket.on("abcd", (d) => {
    id = d;
    console.log(id);
  });
  console.log("sid", id);
  socket.emit("clientMessage", "Hello server!");

  socket.emit("connectit", user);
  socket.on("matchinvitereq", (from, to) => {
    console.log("matchinvitereq", from);
    setIsinvited(from);
    // opp = d;
  });
  socket.on("accepted", (gameid, from, to) => {
    console.log("accepted");
    socket.emit("joinroom", gameid, from, to);
    navigate("/board");
  });
  socket.on("changeuser", (d) => {
    // setUser(d);
  });

  socket.on("msg", (d) => {
    console.log(d);
  });
  function handelClick() {
    if (!invite) {
      return;
    }
    // useEffect(() => {
    // const socket = io("http://localhost:3000"); // Replace with your server URL

    const data = {
      to: invite._id,
      from: user,
    };
    console.log(data);
    socket.emit("matchinvite", data);
  }
  if (!isinvited) {
    return (
      <>
        <button onClick={handelClick}>
          <img src="/people.png" alt="friend" className="side-btn-logo" />
          {invite ? (
            <h1>play with {invite.name}</h1>
          ) : (
            <h1>invite friend to play</h1>
          )}
        </button>
        <button>
          <img src="/shuffle.png" alt="friend" className="side-btn-logo" />
          <h1>user = {socket.id}</h1>
        </button>
      </>
    );
  }

  function handelaccept() {
    socket.emit("accept", isinvited, user);

    console.log("acc");
    console.log(isinvited);

    navigate("/board");
  }
  function handelreject() {
    socket.emit("reject", isinvited.socketId);
  }
  return (
    <div>
      {/* <img src="" alt="" /> */}
      battle request from {isinvited.name}
      <div>
        <button onClick={handelaccept}>accept</button>
        <button onClick={handelreject}>reject</button>
      </div>
    </div>
  );
}
