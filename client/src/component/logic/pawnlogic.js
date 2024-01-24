let available = [];
// let blackpieces = ["pb", "kb", "qb", "bb", "nb", "rb"];
const blackpieces = ["pb", "kb", "qb", "bb", "nb", "rb"];
const whitepieces = ["R", "N", "B", "Q", "K", "P"];
function check(str, arr) {
  let ans = false;
  arr.forEach((element) => {
    if (String(str) === String(element)) {
      ans = true;
    }
  });
  console.log(ans);
  return ans;
}
function isKill(r, c, b) {
  if (r >= 0 && c >= 0 && r < 8 && c < 8) {
    console.log(check(b[r][c], blackpieces));
    if (check(b[r][c], blackpieces)) {
      console.log("kill");
      return true;
    }
  }
  return false;
}
function isKillB(r, c, b) {
  if (r >= 0 && c >= 0 && r < 8 && c < 8) {
    if (check(b[r][c], whitepieces)) {
      console.log("b");
      return true;
    }
  }
  return false;
}

function iioption(r, c, w, b) {
  if (r < 0 || c < 0 || r > 7 || c > 7) {
    return;
  }
  if (b[r][c] === false) {
    available.push([r, c]);
  }
}
function iskilloption(r, c, w, b) {
  if (r < 0 || c < 0 || r > 7 || c > 7) {
    return;
  }
  if (w) {
    if (b[r][c] !== false) {
      if (isKill(r, c, b)) {
        available.push([r, c]);
      }
    }
  }
  if (!w) {
    if (b[r][c] !== false) {
      if (isKillB(r, c, b)) {
        available.push([r, c]);
      }
    }
  }
}
export function pawnlogic(r, c, white, board) {
  available = [];

  if (white === true) {
    iioption(r - 1, c, white, board);
    if (
      Number(r) === 6 &&
      board[r - 1][c] === false &&
      board[r - 2][c] === false
    ) {
      available.push([r - 2, c]);
    }

    iskilloption(r - 1, c + 1, white, board);
    iskilloption(r - 1, c - 1, white, board);
  } else {
    iioption(r - 1, c, white, board);
    if (
      Number(r) === 6 &&
      board[r - 1][c] === false &&
      board[r - 2][c] === false
    ) {
      available.push([r - 2, c]);
    }
    iskilloption(r - 1, c + 1, white, board);
    iskilloption(r - 1, c - 1, white, board);
  }
  console.log(available);
  return available;
}
