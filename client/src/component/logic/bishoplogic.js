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

function runsideway(r, c, white, board) {
  if (white) {
    let i = r + 1;
    let j = c + 1;
    while (i < 8 && j < 8) {
      if (board[i][j] !== false) {
        if (isKill(i, j, board)) {
          available.push([i, j]);
          break;
        }
        break;
      }
      available.push([i, j]);
      i++;
      j++;
    }
    i = r - 1;
    j = c - 1;
    while (i < 8 && j < 8 && i >= 0 && j >= 0) {
      if (board[i][j] !== false) {
        if (isKill(i, j, board)) {
          available.push([i, j]);
          break;
        }
        break;
      }
      available.push([i, j]);
      i--;
      j--;
    }
    i = r + 1;
    j = c - 1;
    while (i < 8 && j < 8 && i >= 0 && j >= 0) {
      if (board[i][j] !== false) {
        if (isKill(i, j, board)) {
          available.push([i, j]);
          break;
        }
        break;
      }
      available.push([i, j]);
      i++;
      j--;
    }
    i = r - 1;
    j = c + 1;
    while (i < 8 && j < 8 && i >= 0 && j >= 0) {
      if (board[i][j] !== false) {
        if (isKill(i, j, board)) {
          available.push([i, j]);
          break;
        }
        break;
      }
      available.push([i, j]);
      i--;
      j++;
    }
  }
  if (!white) {
    let i = r + 1;
    let j = c + 1;
    while (i < 8 && j < 8) {
      if (board[i][j] !== false) {
        if (isKillB(i, j, board)) {
          available.push([i, j]);
          break;
        }
        break;
      }
      available.push([i, j]);
      i++;
      j++;
    }
    i = r - 1;
    j = c - 1;
    while (i < 8 && j < 8 && i >= 0 && j >= 0) {
      if (board[i][j] !== false) {
        if (isKillB(i, j, board)) {
          available.push([i, j]);
          break;
        }
        break;
      }
      available.push([i, j]);
      i--;
      j--;
    }
    i = r + 1;
    j = c - 1;
    while (i < 8 && j < 8 && i >= 0 && j >= 0) {
      if (board[i][j] !== false) {
        if (isKillB(i, j, board)) {
          available.push([i, j]);
          break;
        }
        break;
      }
      available.push([i, j]);
      i++;
      j--;
    }
    i = r - 1;
    j = c + 1;
    while (i < 8 && j < 8 && i >= 0 && j >= 0) {
      if (board[i][j] !== false) {
        if (isKillB(i, j, board)) {
          available.push([i, j]);
          break;
        }
        break;
      }
      available.push([i, j]);
      i--;
      j++;
    }
  }
}
export default function bishopLogic(r, c, white, board) {
  available = [];
  runsideway(r, c, white, board);

  return available;
}
