const router = require('express').Router();
const status = require('http-status');
const express = require('express');
const path = require('path');

const matrixService = require('./matrix.service');
const getStream = require('../../tools/createStream');

const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

router.use(express.static(path.join(__dirname, 'public')));

router.route('/result').post(upload.array('files'), async (req, res) => {
  const resultMatrix = matrixService.getMultiplyMatrix(req.files);

  if (resultMatrix) {

    res.writeHead(status.OK, {
      'Content-Disposition': 'attachment; filename=result.csv',
      'Content-Type': 'text/csv',
      'Content-Length': resultMatrix.length,
    });

    const duplexStream = getStream(resultMatrix);

    duplexStream.pipe(res);
  } else {
    res.status(status.INTERNAL_SERVER_ERROR).send('Internal Server Error');
  }
});

router.route('/random').get((req, res) => {
  const {rowsA, colsA, rowsB, colsB} = req.query;
  const matrices = matrixService.getRandomMatrices([rowsA, colsA], [rowsB, colsB]);
  const resultMatrix = matrixService.multiplyMatrices(...matrices);

  res.writeHead(status.OK, {
    'Content-Disposition': 'attachment; filename=result.csv',
    'Content-Type': 'text/csv',
    'Content-Length': resultMatrix.length,
  });

  const duplexStream = getStream(resultMatrix);

  duplexStream.pipe(res);
});

module.exports = router;
