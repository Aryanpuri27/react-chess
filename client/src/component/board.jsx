import { useEffect, useState } from "react";
import Chatbox from "./chat";
import Openent from "./openent";
import Tile from "./tile";
import Outpieces from "./outpieces";
import socketIO from "socket.io-client";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const chessboardColor = {
  0: {
    0: true,
    1: false,
    2: true,
    3: false,
    4: true,
    5: false,
    6: true,
    7: false,
  },
  1: {
    0: false,
    1: true,
    2: false,
    3: true,
    4: false,
    5: true,
    6: false,
    7: true,
  },
  2: {
    0: true,
    1: false,
    2: true,
    3: false,
    4: true,
    5: false,
    6: true,
    7: false,
  },
  3: {
    0: false,
    1: true,
    2: false,
    3: true,
    4: false,
    5: true,
    6: false,
    7: true,
  },
  4: {
    0: true,
    1: false,
    2: true,
    3: false,
    4: true,
    5: false,
    6: true,
    7: false,
  },
  5: {
    0: false,
    1: true,
    2: false,
    3: true,
    4: false,
    5: true,
    6: false,
    7: true,
  },
  6: {
    0: true,
    1: false,
    2: true,
    3: false,
    4: true,
    5: false,
    6: true,
    7: false,
  },
  7: {
    0: false,
    1: true,
    2: false,
    3: true,
    4: false,
    5: true,
    6: false,
    7: true,
  },
};
function invertArray(array) {
  let inarr = [
    ["R", "N", "B", "Q", "K", "B", "N", "R"], // Row 0 (back row for black pieces)
    ["P", "P", "P", "P", "P", "P", "P", "P"], // Row 1 (pawns for black pieces)
    [" ", " ", " ", " ", " ", " ", " ", " "], // Row 2 (empty row)
    [" ", " ", " ", " ", " ", " ", " ", " "], // Row 3 (empty row)
    [" ", " ", " ", " ", " ", " ", " ", " "], // Row 4 (empty row)
    [" ", " ", " ", " ", " ", " ", " ", " "], // Row 5 (empty row)
    ["p", "p", "p", "p", "p", "p", "p", "p"], // Row 6 (pawns for white pieces)
    ["r", "n", "b", "q", "k", "b", "n", "r"], // Row 7
  ];

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      inarr[i][j] = array[7 - i][7 - j];
    }
  }
  return inarr;
}
export default function Board({ user }) {
  const [available, setavailavle] = useState([]);
  const [chessBoard, setchessBoard] = useState([
    ["R", "N", "B", "Q", "K", "B", "N", "R"], // Row 0 (back row for black pieces)
    ["P", "P", "P", "P", "P", "P", "P", "P"], // Row 1 (pawns for black pieces)
    [false, false, false, false, false, false, false, false], // Row 2 (empty row)
    [false, false, false, false, false, false, false, false], // Row 2 (empty row)
    [false, false, false, false, false, false, false, false], // Row 2 (empty row)
    [false, false, false, false, false, false, false, false], // Row 2 (empty row)
    ["pb", "pb", "pb", "pb", "pb", "pb", "pb", "pb"], // Row 6 (pawns for white pieces)
    ["rb", "nb", "bb", "qb", "kb", "bb", "nb", "rb"], // Row 7 (back row for white pieces)
  ]);
  const [target, setTarget] = useState([]);
  const [killed, setKilled] = useState([]);
  const [Oppkilled, setOppKilled] = useState([]);
  const [white, setWhite] = useState(true);
  const [openent, setOpenent] = useState([]);
  const [turn, setTurn] = useState(false);

  const navigate = useNavigate();
  // useEffect(() => {
  //   const socket = socketIO.connect("http://localhost:4000");

  //   console.log("boardchange");
  //   socket.emit("boardchange", invertArray(chessBoard), openent);

  //   // return () => {
  //   //   socket.disconnect();
  //   // };
  // }, [chessBoard, openent]);
  useEffect(() => {
    // const socket = io("http://localhost:3000"); // Replace with your server URL

    const socket = socketIO.connect("http://localhost:4000");

    socket.emit("connectit", user);

    socket.emit("getgame", user);

    socket.on("nogame", () => {
      navigate("/");
    });

    socket.on("gamedata", (d, opp, cur) => {
      console.log("gamedata", d);
      console.log("gamedata opp", opp);
      console.log("gamedata cur", cur);
      if (d.white !== user._id) {
        setWhite(false);
        setchessBoard((e) => invertArray(e));
        setTurn(true);
      }
      if (opp._id === user._id) {
        console.log(cur);
        setOpenent(cur);
      }
      if (cur._id === user._id) {
        console.log(opp);
        setOpenent(opp);
      }
    });

    socket.on("newboard", (board) => {
      setchessBoard(board);
    });
    socket.on("kills", (kills) => {
      setOppKilled(kills);
      setTurn((e) => !e);
    });
    // Clean up the socket connection when the component unmounts
    // return () => {
    //   socket.disconnect();
    // };
  }, [user, navigate, setchessBoard]);

  return (
    <>
      <Header user={user} />
      <div className="flex flex-row cogp bg-con1">
        <Chatbox />
        <div className="gp">
          <div className="boardParent">
            <div className="openent">
              <Openent user={openent} />
              <Outpieces killed={Oppkilled} />
            </div>
            <div className="board">
              {Object.entries(chessboardColor).map(([key, value]) => (
                <PrintRow
                  row={key}
                  col={value}
                  available={available}
                  setavailavle={setavailavle}
                  chessBoard={chessBoard}
                  setchessBoard={setchessBoard}
                  target={target}
                  setTarget={setTarget}
                  killed={killed}
                  setKilled={setKilled}
                  turn={turn}
                  white={white}
                  openent={openent}
                  setTurn={setTurn}
                />
              ))}
            </div>
            <div className="flex flex-row justify-around b-down">
              <Outpieces killed={killed} turn={turn} />
              <button className="resign-btn">resign</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function PrintRow({
  row,
  col,
  available,
  setavailavle,
  chessBoard,
  setchessBoard,
  target,
  setTarget,
  killed,
  setKilled,
  white,
  turn,
  openent,
  setTurn,
}) {
  return (
    <div className="boardRow">
      {Object.values(col).map((e, val) => (
        <Tile
          white={e}
          row={row}
          col={val}
          available={available}
          setavailavle={setavailavle}
          chessBoard={chessBoard}
          setchessBoard={setchessBoard}
          target={target}
          setTarget={setTarget}
          killed={killed}
          setKilled={setKilled}
          iswhite={white}
          turn={turn}
          openent={openent}
          setTurn={setTurn}
        />
      ))}
    </div>
  );
}
