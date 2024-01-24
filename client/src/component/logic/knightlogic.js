const blackpieces = ["pb", "kb", "qb", "bb", "nb", "rb"];
const whitepieces = ["R", "N", "B", "Q", "K", "P"];
let available = [];
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

function isoption(r, c, w, b) {
  if (r < 0 || c < 0 || r > 7 || c > 7) {
    return;
  }
  if (w) {
    console.log("w");
    if (b[r][c] === false) {
      available.push([r, c]);
    } else {
      if (isKill(r, c, b)) {
        available.push([r, c]);
      }
    }
  }
  if (!w) {
    if (b[r][c] === false) {
      available.push([r, c]);
    } else {
      if (isKillB(r, c, b)) {
        available.push([r, c]);
      }
    }
  }
}

export default function knightLogic(r, c, white, board) {
  available = [];
  console.log(white);
  isoption(r + 2, c - 1, white, board);
  isoption(r + 2, c + 1, white, board);
  isoption(r - 2, c - 1, white, board);
  isoption(r - 2, c + 1, white, board);
  isoption(r + 1, c - 2, white, board);
  isoption(r - 1, c - 2, white, board);
  isoption(r + 1, c + 2, white, board);
  isoption(r - 1, c + 2, white, board);

  return available;
}
