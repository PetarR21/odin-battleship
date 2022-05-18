const shipFactory = require('../scripts/shipFactory.js');

test('shipFactory function exists', () => {
  expect(typeof shipFactory).toBe('function');
});

test('when all positions hit, ship should be sunk', () => {
  const ship = shipFactory(3);
  ship.hit(0);
  ship.hit(1);
  ship.hit(2);

  expect(ship.isSunk()).toBeTruthy();
});

test('when not all positions are hit, ship should not be sunk', () => {
  const ship = shipFactory(3);
  ship.hit(0);
  ship.hit(2);

  expect(ship.isSunk()).toBeFalsy();
});

test('When one ship is hit other one is not', () => {
  const ships = [];
  ships.push(shipFactory(2));
  ships.push(shipFactory(3));

  ships[0].hit(0);
  ships[0].hit(1);

  expect(ships[0].isSunk()).toBeTruthy();
  expect(ships[1].isSunk()).toBeFalsy();
});
