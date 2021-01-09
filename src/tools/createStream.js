const { Duplex } = require('stream');

const getStream = buffer => {
  const stream = new Duplex();
  stream.push(buffer);
  stream.push(null);
  return stream;
};

module.exports = getStream;
