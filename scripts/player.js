export const player = (enemyBoard) => {
  let alreadyPlayed = [];

  const position = (row, col) => {
    return {
      row: row,
      col: col,
    };
  };

  const attack = (row, col) => {
    return enemyBoard.placeAttack(row, col);
  };

  const didWin = () => {
    return enemyBoard.areAllShipsSunk();
  };

  const alredyAttacked = (pos) => {
    for (let i = 0; i < alreadyPlayed.length; i++) {
      if (alreadyPlayed[i].row === pos.row && alreadyPlayed[i].col === pos.col)
        return true;
    }
    return false;
  };

  const autoAttack = () => {
    if (alreadyPlayed.length === 100) return false;

    let randomRow = parseInt(Math.random() * 10);
    let randomCol = parseInt(Math.random() * 10);
    while (alredyAttacked({ row: randomRow, col: randomCol })) {
      randomRow = parseInt(Math.random() * 10);
      randomCol = parseInt(Math.random() * 10);
    }

    alreadyPlayed.push({ row: randomRow, col: randomCol });

    return {
      check: enemyBoard.placeAttack(randomRow, randomCol),
      r: randomRow,
      c: randomCol,
    };
  };

  return { attack, didWin, autoAttack };
};
