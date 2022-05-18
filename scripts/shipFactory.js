export const shipFactory = (length) => {
  let hitBox = [];
  let sunk = false;

  //Initialize hitbox based on length
  for (let i = 0; i < length; i++) {
    hitBox.push(false);
  }

  //Check if all postions are hit
  const isSunk = () => {
    for (let i = 0; i < length; i++) {
      if (hitBox[i] === false) return false;
    }

    return true;
  };

  const hit = (position) => {
    hitBox[position] = true;
  };

  //Getters
  const getLength = () => {
    return length;
  };

  return { length, isSunk, hit, hitBox };
};
