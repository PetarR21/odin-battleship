const gameBoardFactory = require('../scripts/gameBoardFactory.js');
const player = require('../scripts/player.js');

test('player factory exists', () => {
  expect(typeof player).toBe('function');
});

test('gameBoardFactory exists', () => {
  expect(typeof gameBoardFactory).toBe('function');
});

test('player sinks all enemy ships', () => {
  const board1 = gameBoardFactory();
  board1.placeShip(0, 1, 2, false);
  board1.placeShip(3, 3, 2, true);

  const player1 = player(board1);
  expect(player1.attack(0, 1)).toBeTruthy();
  expect(player1.didWin()).toBeFalsy();
  expect(player1.attack(0, 0)).toBeFalsy();
  expect(player1.attack(3, 3)).toBeTruthy();
  expect(player1.attack(0, 2)).toBeTruthy();
  expect(player1.didWin()).toBeFalsy();
  expect(player1.attack(4, 3)).toBeTruthy();
  expect(player1.didWin()).toBeTruthy();
});

test('ai sinks all player ships', () => {
  const board = gameBoardFactory();
  board.placeShip(0, 1, 2, false);
  board.placeShip(3, 3, 2, true);

  const comp = player(board);
  for (let i = 0; i < 3; i++) {
    comp.autoAttack();
  }
  expect(comp.didWin()).toBeFalsy();
  for (let i = 0; i < 100; i++) {
    comp.autoAttack();
  }

  expect(comp.didWin()).toBeTruthy();
});

test('Player attacks four time,computer attacks 4 times', () => {
  const board1 = gameBoardFactory();
  board1.placeShip(0, 1, 2, false);
  board1.placeShip(3, 3, 2, true);

  const board2 = gameBoardFactory();
  board2.placeShip(3, 1, 3, false);

  const user = player(board2);
  const comp = player(board1);

  user.attack(3, 1);
  comp.autoAttack();
  user.attack(3, 2);
  comp.autoAttack();
  expect(user.didWin()).toBeFalsy();
  expect(comp.didWin()).toBeFalsy();
  user.attack(3, 3);
  comp.autoAttack();
  expect(user.didWin()).toBeTruthy();
  expect(comp.didWin()).toBeFalsy();
});
