const gameBoardFactory = require('../scripts/gameBoardFactory.js');

test('gameBoardFactory exists', () => {
  expect(typeof gameBoardFactory).toBe('function');
});

test('doesnt place ship out of bounds', () => {
  const gameBoard = gameBoardFactory();
  expect(gameBoard.placeShip(0, 0, 11, false)).toBeFalsy();
});

test('does place ship in bounds', () => {
  const gameBoard = gameBoardFactory();
  expect(gameBoard.placeShip(0, 0, 5, true)).toBeTruthy();
});

test('does not place ship over other ship', () => {
  const gameBoard = gameBoardFactory();
  expect(gameBoard.placeShip(0, 0, 4, false)).toBeTruthy();
  expect(gameBoard.placeShip(0, 1, 3, true)).toBeFalsy();
});

test('sink all ships', () => {
  const gameBoard = gameBoardFactory();
  expect(gameBoard.placeShip(0, 0, 2, false)).toBeTruthy();
  expect(gameBoard.placeShip(1, 1, 3, true)).toBeTruthy();

  expect(gameBoard.placeAttack(0, 0)).toBeTruthy();
  expect(gameBoard.placeAttack(0, 3)).toBeFalsy();
  expect(gameBoard.placeAttack(0, 1)).toBeTruthy();
  expect(gameBoard.placeAttack(1, 1)).toBeTruthy();
  expect(gameBoard.placeAttack(2, 1)).toBeTruthy();
  expect(gameBoard.areAllShipsSunk()).toBeFalsy();
  expect(gameBoard.placeAttack(3, 1)).toBeTruthy();

  expect(gameBoard.areAllShipsSunk()).toBeTruthy();
});
