let available = [];
let blackpieces = ["pb", "kb", "qb", "bb", "nb", "rb"];
let whitepieces = ["R", "N", "B", "Q", "K", "P"];
function isKill(r, c, b) {
  if (r >= 0 && c >= 0 && r < 8 && c < 8) {
    if (b[r][c] in blackpieces) {
      return true;
    }
  }
  return false;
}
function isKillB(r, c, b) {
  if (r >= 0 && c >= 0 && r < 8 && c < 8) {
    if (b[r][c] in whitepieces) {
      return true;
    }
  }
  return false;
}
function pushforW(r, c, board) {
  if (r >= 0 && c >= 0 && r < 8 && c < 8) {
    if (board[r][c] === false) {
      available.push([r, c]);
    }
    if (isKill(r, c, board)) {
      available.push([r, c]);
    }
  }
}
function pushforB(r, c, board) {
  if (r >= 0 && c >= 0 && r < 8 && c < 8) {
    if (board[r][c] === false) {
      available.push([r, c]);
    }
    if (isKillB(r, c, board)) {
      available.push([r, c]);
    }
  }
}
export default function kingLogic(r, c, white, board) {
  available = [];
  if (white) {
    pushforW(r + 1, c, board);
    pushforW(r + 1, c + 1, board);
    pushforW(r + 1, c - 1, board);
    pushforW(r, c + 1, board);
    pushforW(r, c - 1, board);
    pushforW(r - 1, c, board);
    pushforW(r - 1, c + 1, board);
    pushforW(r - 1, c - 1, board);
    // if (board[r + 1][c] === false) {
    //   available.push([r + 1, c]);
    // }
    // if (board[r + 1][c - 1] === false) {
    //   available.push([r + 1, c - 1]);
    // }
    // if (board[r + 1][c + 1] === false) {
    //   available.push([r + 1, c + 1]);
    // }
    // if (board[r - 1][c] === false) {
    //   available.push([r - 1, c]);
    // }
    // if (board[r - 1][c - 1] === false) {
    //   available.push([r - 1, c - 1]);
    // }
    // if (board[r - 1][c + 1] === false) {
    //   available.push([r - 1, c + 1]);
    // }
    // if (board[r][c - 1] === false) {
    //   available.push([r, c - 1]);
    // }
    // if (board[r][c + 1] === false) {
    //   available.push([r, c + 1]);
    // }
    // if (isKill(r + 1, c)) {
    //   available.push([r + 1, c]);
    // }
    // if (isKill(r - 1, c)) {
    //   available.push([r - 1, c]);
    // }
    // if (isKill(r + 1, c + 1)) {
    //   available.push([r + 1, c + 1]);
    // }
    // if (isKill(r - 1, c + 1)) {
    //   available.push([r - 1, c + 1]);
    // }
    // if (isKill(r + 1, c - 1)) {
    //   available.push([r + 1, c - 1]);
    // }
    // if (isKill(r - 1, c - 1)) {
    //   available.push([r - 1, c - 1]);
    // }
    // if (isKill(r, c - 1)) {
    //   available.push([r, c - 1]);
    // }
    // if (isKill(r, c + 1)) {
    //   available.push([r, c + 1]);
    // }
  }

  if (!white) {
    pushforB(r + 1, c, board);
    pushforB(r + 1, c + 1, board);
    pushforB(r + 1, c - 1, board);
    pushforB(r, c + 1, board);
    pushforB(r, c - 1, board);
    pushforB(r - 1, c, board);
    pushforB(r - 1, c + 1, board);
    pushforB(r - 1, c - 1, board);
    //     if (board[r + 1][c] === false) {
    //       available.push([r + 1, c]);
    //     }
    //     if (board[r + 1][c - 1] === false) {
    //       available.push([r + 1, c - 1]);
    //     }
    //     if (board[r + 1][c + 1] === false) {
    //       available.push([r + 1, c + 1]);
    //     }
    //     if (board[r - 1][c] === false) {
    //       available.push([r - 1, c]);
    //     }
    //     if (board[r - 1][c - 1] === false) {
    //       available.push([r - 1, c - 1]);
    //     }
    //     if (board[r - 1][c + 1] === false) {
    //       available.push([r - 1, c + 1]);
    //     }
    //     if (board[r][c - 1] === false) {
    //       available.push([r, c - 1]);
    //     }
    //     if (board[r][c + 1] === false) {
    //       available.push([r, c + 1]);
    //     }
    //     if (isKillB(r + 1, c)) {
    //       available.push([r + 1, c]);
    //     }
    //     if (isKillB(r - 1, c)) {
    //       available.push([r - 1, c]);
    //     }
    //     if (isKillB(r + 1, c + 1)) {
    //       available.push([r + 1, c + 1]);
    //     }
    //     if (isKillB(r - 1, c + 1)) {
    //       available.push([r - 1, c + 1]);
    //     }
    //     if (isKillB(r + 1, c - 1)) {
    //       available.push([r + 1, c - 1]);
    //     }
    //     if (isKillB(r - 1, c - 1)) {
    //       available.push([r - 1, c - 1]);
    //     }
    //     if (isKillB(r, c - 1)) {
    //       available.push([r, c - 1]);
    //     }
    //     if (isKillB(r, c + 1)) {
    //       available.push([r, c + 1]);
    //     }
  }

  return available;
}
