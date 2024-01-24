import { useState } from "react";
import Getpiece from "./getpiece";
import { whichLogic } from "./logic/whichpiece";
import socketIO from "socket.io-client";
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
function checkin(r, c, av) {
  const arr = [r, c];
  let ans = false;
  if (av) {
    av.forEach((element) => {
      // console.log(arr[0] === element[0] && arr[1] === element[1]);
      if (arr[0] === element[0] && arr[1] === element[1]) {
        ans = true;
      }
    });
  }
  return ans;
}
const socket = socketIO.connect("http://localhost:4000");
function Swappiecses(from, to, board1, setKilled, killed, openent, setTurn) {
  let board = board1;
  let whear = board[to[0]][to[1]];
  if (whear) {
    const dta = [...killed, whear];
    setKilled((e) => [...e, whear]);
    console.log("killed");
    console.log("opp", openent);
    socket.emit("endoppkill", dta, openent);
    // return () => {
    // socket.disconnect();
    // };
  } else {
    socket.emit("endoppkill", killed, openent);
    setTurn((e) => !e);
  }
  const which = board[from[0]][from[1]];
  board[from[0]][from[1]] = false;
  board[to[0]][to[1]] = which;
  return board;
}
export default function Tile({
  white,
  col,
  row,
  available,
  setavailavle,
  chessBoard,
  setchessBoard,
  target,
  setTarget,
  killed,
  setKilled,
  turn,
  iswhite,
  openent,
  setTurn,
}) {
  function handelClick(e) {
    console.log(row, col);
    if (checkin(Number(row), Number(col), available)) {
      console.log(target);
      console.log([row, col]);
      console.log(openent);
      setchessBoard(
        Swappiecses(
          target,
          [row, col],
          chessBoard,
          setKilled,
          killed,
          openent,
          setTurn
        )
      );
      console.log(chessBoard);
      setavailavle((e) => []);
      setTarget([]);
      // useEffect(() => {
      // const socket = socketIO.connect("http://localhost:4000");
      console.log("boardchange");
      socket.emit("boardchange", invertArray(chessBoard), openent);
      // socket.disconnect();

      // return () => {
      //   socket.disconnect();
      // };
      // }, [chessBoard, openent]);
    } else {
      if (turn) {
        const pos = e.target.id.split("");
        setTarget([row, col]);
        // if (iswhite) {
        //   setavailavle(
        //     whichLogic(Number(pos[0]), Number(pos[1]), invertArray(chessBoard))
        //   );
        // } else {
        setavailavle(whichLogic(Number(pos[0]), Number(pos[1]), chessBoard));
        // }
      }
    }
  }
  return (
    <>
      <div
        onClick={handelClick}
        id={row + col}
        className={`tile ${white ? "whitetile" : "blacktile"} ${
          checkin(Number(row), Number(col), available) ? "available" : ""
        }`}
      >
        <Getpiece row={row} col={col} chessboard={chessBoard} />
      </div>
    </>
  );
}
