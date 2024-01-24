import Chatmsg from "./chatbox";

export default function Chatbox() {
  return (
    <div className="chatboxParent">
      <div className="chatbox">
        <div className="msgcontainer">
          <Chatmsg />
        </div>
        <div className="msginputcontainer">
          <input type="text" placeholder="Enter Message" />
          <button>send</button>
        </div>
      </div>
    </div>
  );
}
