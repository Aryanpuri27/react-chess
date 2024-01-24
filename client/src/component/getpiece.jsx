// let chessboard = [
//   ["R", "N", "B", "Q", "K", "B", "N", "R"], // Row 0 (back row for black pieces)
//   ["P", "P", "P", "P", "P", "P", "P", "P"], // Row 1 (pawns for black pieces)
//   [false, false, false, false, false, false, false, false], // Row 2 (empty row)
//   [false, false, false, false, false, false, false, false], // Row 2 (empty row)
//   [false, false, false, false, false, false, false, false], // Row 2 (empty row)
//   [false, false, false, false, false, false, false, false], // Row 2 (empty row)
//   ["pb", "pb", "pb", "pb", "pb", "pb", "pb", "pb"], // Row 6 (pawns for white pieces)
//   ["rb", "nb", "bb", "qb", "kb", "bb", "nb", "rb"], // Row 7 (back row for white pieces)
// ];
export default function Getpiece({ row, col, chessboard }) {
  const chr = chessboard[row][col];

  return (
    <>
      {!chr ? (
        ""
      ) : (
        <img
          src={`../pieces/${chr}.png`}
          alt="piece"
          className="piece"
          id={row + col}
        />
      )}
    </>
  );
}
