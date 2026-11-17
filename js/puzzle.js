// Mate-in-one puzzle. The only winning move is Re1-e8 (back-rank mate).
(() => {
  const boardEl = document.getElementById("board");
  const statusEl = document.getElementById("puzzle-status");
  const NAMES = { K: "king", Q: "queen", R: "rook", B: "bishop", N: "knight", P: "pawn" };
  const GLYPH = { K: "♚", Q: "♛", R: "♜", B: "♝", N: "♞", P: "♟" };
  const START = {
    g1: "wK", e1: "wR", c2: "wB", f2: "wP", g2: "wP", h2: "wP",
    g8: "bK", b6: "bN", a7: "bP", f7: "bP", g7: "bP", h7: "bP",
  };
  const SOLUTION = { from: "e1", to: "e8" };

  let pieces, selected, solved;

  function build() {
    boardEl.replaceChildren();
    for (let rank = 8; rank >= 1; rank--) {
      for (let f = 0; f < 8; f++) {
        const file = "abcdefgh"[f];
        const sq = document.createElement("button");
        sq.type = "button";
        sq.dataset.sq = file + rank;
        sq.className = "sq " + ((f + rank) % 2 === 1 ? "dark" : "light");
        if (rank === 1) sq.dataset.file = file;
        if (f === 0) sq.dataset.rank = rank;
        boardEl.append(sq);
      }
    }
  }

  function draw() {
    boardEl.querySelectorAll(".sq").forEach((sq) => {
      const id = sq.dataset.sq;
      const piece = pieces[id];
      sq.className = sq.className.replace(/ ?(sel|w|b)\b/g, "");
      sq.textContent = piece ? GLYPH[piece[1]] + "\uFE0E" : "";
      if (piece) sq.classList.add(piece[0]);
      if (id === selected) sq.classList.add("sel");
      sq.setAttribute("aria-label", piece ? `${id}, ${piece[0] === "w" ? "white" : "black"} ${NAMES[piece[1]]}` : `${id}, empty`);
    });
  }

  function reset() {
    pieces = { ...START };
    selected = null;
    solved = false;
    statusEl.textContent = "Find the checkmate.";
    statusEl.className = "status";
    draw();
  }

  boardEl.addEventListener("click", (e) => {
    const sq = e.target.closest(".sq");
    if (!sq || solved) return;
    const id = sq.dataset.sq;
    const piece = pieces[id];

    if (!selected || (piece && piece[0] === "w")) {
      selected = piece && piece[0] === "w" && id !== selected ? id : null;
      return draw();
    }
    if (selected === SOLUTION.from && id === SOLUTION.to) {
      pieces[id] = pieces[selected];
      delete pieces[selected];
      solved = true;
      statusEl.textContent = "Re8#. Checkmate! Black's own pawns block f7, g7 and h7, so the king has nowhere to go.";
      statusEl.className = "status win";
    } else {
      statusEl.textContent = "That isn't checkmate. Try again.";
      statusEl.className = "status miss";
    }
    selected = null;
    draw();
  });

  document.getElementById("puzzle-reset").addEventListener("click", reset);
  document.getElementById("puzzle-hint").addEventListener("click", () => {
    if (solved) return;
    statusEl.textContent = "Hint: the e-file is wide open, and Black's king is boxed in on the back rank.";
    statusEl.className = "status";
  });

  build();
  reset();
})();
