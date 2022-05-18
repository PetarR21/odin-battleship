import { shipFactory } from './shipFactory.js';

export const gameBoardFactory = () => {
  let board = [];
  let ships = [];
  //Initialize board
  for (let i = 0; i < 10; i++) {
    board.push([]);
    for (let j = 0; j < 10; j++) {
      board[i].push({
        ship: null,
        part: null,
      });
    }
  }

  const getBoard = () => {
    let str = '';
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        str += board[i][j].ship + ':' + board[i][j].part + ' ';
      }
      str += '\n';
    }

    return str;
  };

  const validatePostion = (row, col, length, rotate) => {
    if (board[row][col].ship !== null) {
      return false;
    }

    if (!rotate) {
      return col + length <= 10;
    } else {
      return row + length <= 10;
    }
  };

  const placeShip = (row, col, length, rotate) => {
    if (!validatePostion(row, col, length, rotate)) {
      return false;
    }

    let newShip = shipFactory(length);
    ships.push(newShip);
    if (!rotate) {
      for (let i = col, j = 0; i < col + length; i++, j++) {
        board[row][i].ship = newShip;
        board[row][i].part = j;
      }
    } else {
      for (let i = row, j = 0; i < row + length; i++, j++) {
        board[i][col].ship = newShip;
        board[i][col].part = j;
      }
    }

    return true;
  };

  const placeAttack = (row, col) => {
    if (board[row][col].ship === null) return false;
    board[row][col].ship.hitBox[board[row][col].part] = true;
    return true;
  };

  const areAllShipsSunk = () => {
    for (let i = 0; i < ships.length; i++) {
      let shipHitBox = ships[i].hitBox;
      for (let j = 0; j < shipHitBox.length; j++) {
        if (!shipHitBox[j]) return false;
      }
    }

    return true;
  };

  return { board, getBoard, ships, placeShip, placeAttack, areAllShipsSunk };
};
