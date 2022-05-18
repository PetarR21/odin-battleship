import { gameBoardFactory } from './gameBoardFactory.js';
import { player } from './player.js';

/* Logic */
const playerBoard = gameBoardFactory();
const computerBoard = gameBoardFactory();

/* UI */
const grid1 = document.getElementById('grid1');
const grid2 = document.getElementById('grid2');
const overlayGrid = document.getElementById('overlay-grid');
const overlay = document.getElementById('overlay');
const rotateBtn = document.getElementById('rotate-btn');
const shipType = document.getElementById('ship-type');
const resultText = document.getElementById('result-text');
const playAgainBtn = document.getElementById('alert-button');
const alertElement = document.getElementById('alert');
const alertResult = document.getElementById('alert-result');

function generateCells(gridElement) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement('div');
      cell.setAttribute('data-row', i);
      cell.setAttribute('data-col', j);
      cell.classList.add('cell');
      gridElement.appendChild(cell);
    }
  }
}

generateCells(grid1);
generateCells(grid2);
generateCells(overlayGrid);

let currentShipLength = 5;
let rotate = false;

function isValidPosition(row, col) {
  return row >= 0 && row <= 9 && col >= 0 && col <= 9;
}

function isValidRow(row) {
  return row >= 0 && row <= 9;
}

function isValidCol(c) {
  return c >= 0 && c <= 9;
}

function hoverShip(row, col) {
  let currentRow = parseInt(row);
  let currentCol = parseInt(col);
  if (!rotate) {
    for (let i = 0; i < currentShipLength; i++) {
      if (isValidCol(currentCol)) {
        overlayGrid
          .querySelector(`[data-row="${row}"][data-col="${currentCol}"]`)
          .classList.add('hovered');
      }
      currentCol++;
    }
  }
  if (rotate) {
    for (let i = 0; i < currentShipLength; i++) {
      if (isValidRow(currentRow)) {
        overlayGrid
          .querySelector(`[data-row="${currentRow}"][data-col="${currentCol}"]`)
          .classList.add('hovered');
      }
      currentRow++;
    }
  }
}

function unHoverShip(row, col) {
  let currentRow = parseInt(row);
  let currentCol = parseInt(col);
  if (!rotate) {
    for (let i = 0; i < currentShipLength; i++) {
      if (isValidCol(currentCol)) {
        overlayGrid
          .querySelector(`[data-row="${row}"][data-col="${currentCol}"]`)
          .classList.remove('hovered');
      }
      currentCol++;
    }
  }

  if (rotate) {
    for (let i = 0; i < currentShipLength; i++) {
      if (isValidRow(currentRow)) {
        overlayGrid
          .querySelector(`[data-row="${currentRow}"][data-col="${currentCol}"]`)
          .classList.remove('hovered');
      }
      currentRow++;
    }
  }
}

function getCell(row, col) {
  const cell = overlayGrid.querySelector(
    `[data-row="${parseInt(row)}"][data-col="${parseInt(col)}"]`
  );
  return cell;
}

function getCellGrid(row, col, grid) {
  const cell = grid.querySelector(
    `[data-row="${parseInt(row)}"][data-col="${parseInt(col)}"]`
  );
  return cell;
}

function checkPosition(row, col) {
  if (!rotate) {
    for (let i = 0; i < currentShipLength; i++) {
      let currentCol = col + i;
      if (
        !isValidPosition(row, currentCol) ||
        getCell(row, currentCol).classList.contains('selected')
      ) {
        return false;
      }
    }
    return true;
  } else {
    for (let i = 0; i < currentShipLength; i++) {
      let currentRow = row + i;
      if (
        !isValidPosition(currentRow, col) ||
        getCell(currentRow, col).classList.contains('selected')
      ) {
        return false;
      }
    }
    return true;
  }
}

function checkPositionCOMP(row, col, rot) {
  if (!rot) {
    for (let i = 0; i < currentShipLength; i++) {
      let currentCol = col + i;
      if (
        !isValidPosition(row, currentCol) ||
        getCellGrid(row, currentCol, grid2).classList.contains('selected')
      ) {
        return false;
      }
    }
    return true;
  } else {
    for (let i = 0; i < currentShipLength; i++) {
      let currentRow = row + i;
      if (
        !isValidPosition(currentRow, col) ||
        getCellGrid(currentRow, col, grid2).classList.contains('selected')
      ) {
        return false;
      }
    }
    return true;
  }
}

function selectPosition(row, col) {
  if (!rotate) {
    for (let i = 0; i < currentShipLength; i++) {
      let currentCol = col + i;
      getCell(row, currentCol).classList.add('selected');
    }
  } else {
    for (let i = 0; i < currentShipLength; i++) {
      let currentRow = row + i;
      getCell(currentRow, col).classList.add('selected');
    }
  }
}

function closeOverlay() {
  overlay.classList.add('hidden');
}

function placeShipUI(grid, row, col) {
  console.log(grid);
  if (!rotate) {
    for (let i = 0; i < currentShipLength; i++) {
      let currentCol = col + i;
      grid
        .querySelector(
          `[data-row="${parseInt(row)}"][data-col="${parseInt(currentCol)}"]`
        )
        .classList.add('selected');
    }
  } else {
    for (let i = 0; i < currentShipLength; i++) {
      let currentRow = row + i;
      grid
        .querySelector(
          `[data-row="${parseInt(currentRow)}"][data-col="${parseInt(col)}"]`
        )
        .classList.add('selected');
    }
  }
}

function placeShipUICOMP(grid, row, col, rot, length) {
  if (!rot) {
    for (let i = 0; i < length; i++) {
      let currentCol = col + i;
      grid
        .querySelector(
          `[data-row="${parseInt(row)}"][data-col="${parseInt(currentCol)}"]`
        )
        .classList.add('selected');
    }
  } else {
    for (let i = 0; i < length; i++) {
      let currentRow = row + i;
      grid
        .querySelector(
          `[data-row="${parseInt(currentRow)}"][data-col="${parseInt(col)}"]`
        )
        .classList.add('selected');
    }
  }
}

function placeShip(row, col) {
  let startRow = parseInt(row);
  let startCol = parseInt(col);

  if (checkPosition(startRow, startCol)) {
    playerBoard.placeShip(startRow, startCol, currentShipLength, rotate);
    placeShipUI(grid1, startRow, startCol);

    selectPosition(startRow, startCol);
    currentShipLength--;
    if (currentShipLength === 1) {
      closeOverlay();
    } else if (currentShipLength === 4) {
      shipType.textContent = 'Battleship';
    } else if (currentShipLength === 3) {
      shipType.textContent = 'Destroyer';
    } else {
      shipType.textContent = 'Patrol Boat';
    }

    return true;
  } else {
    return false;
  }
}

function placeComputerShips() {
  for (let i = 5; i > 1; i--) {
    let row = parseInt(Math.random() * 10);
    let col = parseInt(Math.random() * 10);
    let randomRotate = parseInt(Math.random() * 2) === 0 ? true : false;
    while (!checkPositionCOMP(row, col, randomRotate)) {
      row = parseInt(Math.random() * 10);
      col = parseInt(Math.random() * 10);
      randomRotate = parseInt(Math.random() * 2) === 0 ? true : false;
    }

    computerBoard.placeShip(row, col, i, randomRotate);
    placeShipUICOMP(grid2, row, col, randomRotate, i);
  }
}

//Events> Hover/Unhover
overlayGrid.querySelectorAll('.cell').forEach((cell) => {
  cell.addEventListener('mouseenter', (e) => {
    let row = e.target.dataset.row;
    let col = e.target.dataset.col;
    hoverShip(row, col);
  });
});

overlayGrid.querySelectorAll('.cell').forEach((cell) => {
  cell.addEventListener('mouseleave', (e) => {
    let row = e.target.dataset.row;
    let col = e.target.dataset.col;
    unHoverShip(row, col);
  });
});

//Event select ship position
overlayGrid.querySelectorAll('.cell').forEach((cell) => {
  cell.addEventListener('click', (e) => {
    let row = e.target.dataset.row;
    let col = e.target.dataset.col;
    placeShip(row, col);
  });
});

rotateBtn.addEventListener('click', () => {
  rotate === false ? (rotate = true) : (rotate = false);
});

placeComputerShips();

function openResults(result) {
  alertElement.classList.remove('hidden');
  alertResult.textContent = 'You ' + result.toLowerCase() + '!';
}

const user = player(computerBoard);
const computer = player(playerBoard);

grid2.addEventListener('click', (e) => {
  const row = parseInt(e.target.dataset.row);
  const col = parseInt(e.target.dataset.col);
  const cell = getCellGrid(row, col, grid2);

  if (cell.classList.contains('hit') || cell.classList.contains('miss')) return;

  if (user.attack(row, col)) {
    cell.classList.add('hit');
    resultText.textContent = 'Hit!';
  } else {
    cell.classList.add('miss');
    resultText.textContent = 'Miss!';
  }

  if (user.didWin()) {
    openResults('WIN!');
  }

  const computerAttack = computer.autoAttack();
  if (computerAttack.check) {
    getCellGrid(computerAttack.r, computerAttack.c, grid1).classList.add('hit');
  } else {
    getCellGrid(computerAttack.r, computerAttack.c, grid1).classList.add(
      'miss'
    );
  }

  if (computer.didWin()) {
    openResults('LOOSE');
  }
});

playAgainBtn.addEventListener('click', () => {
  location.reload();
  alertElement.classList.add('hidden');
});
