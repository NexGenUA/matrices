const multiplyMatrices = (mA, mB) => {

  const resultMatrix = [];

  const lengthMatrix = Math.max(mA[0].length, mB[0].length)

  if (mA[0].length !== lengthMatrix) {
    [mA, mB] = [mB, mA];
  }

  mA.forEach((elements, idx) => {
    for (let j = 0; j < mB[0].length; j++) {
      let value = 0;

      elements.forEach((el, i) => {
        value += el * mB[i][j];
      });

      if (!Array.isArray(resultMatrix[idx])) {
        resultMatrix[idx] = [];
      }

      resultMatrix[idx].push(value);
    }
  })

  return getBuffer(resultMatrix);
};

const getMultiplyMatrix = files => {
  try {
    const matrices = files
      .map(file => file.buffer
        .toString()
        .split('\n')
        .filter(data => !!data)
        .map(line => line.split(',')));

    return multiplyMatrices(...matrices);
  } catch {
    return null;
  }
};

const getRandomMatrices = (sizeA, sizeB) => {
  const generateMatrix = (rows, cols) =>
    [...Array(+rows)].map(() => [...Array(+cols)]
      .map(() => +(Math.random() * 100)
        .toFixed(2)));
  return [generateMatrix(...sizeA), generateMatrix(...sizeB)];
};

const getBuffer = resultMatrix => Buffer.from(resultMatrix.join('\n'), 'utf-8');

module.exports = { multiplyMatrices, getMultiplyMatrix, getRandomMatrices };
