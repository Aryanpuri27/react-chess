import bishopLogic from "./bishoplogic";
import kingLogic from "./kinglogic";
import knightLogic from "./knightlogic";
import { pawnlogic } from "./pawnlogic";
import queenLogic from "./queenlogic";
import rookLogic from "./rooklogic";

export function whichLogic(r, c, board) {
  const val = board[r][c];
  console.log(val);
  if (val === "pb") {
    return pawnlogic(r, c, false, board);
  }
  if (val === "P") {
    return pawnlogic(r, c, true, board);
  }
  if (val === "kb") {
    return kingLogic(r, c, false, board);
  }
  if (val === "K") {
    return kingLogic(r, c, true, board);
  }
  if (val === "qb") {
    return queenLogic(r, c, false, board);
  }
  if (val === "Q") {
    return queenLogic(r, c, true, board);
  }
  if (val === "nb") {
    return knightLogic(r, c, false, board);
  }
  if (val === "N") {
    return knightLogic(r, c, true, board);
  }
  if (val === "rb") {
    return rookLogic(r, c, false, board);
  }
  if (val === "R") {
    return rookLogic(r, c, true, board);
  }
  if (val === "bb") {
    return bishopLogic(r, c, false, board);
  }
  if (val === "B") {
    return bishopLogic(r, c, true, board);
  }
}
