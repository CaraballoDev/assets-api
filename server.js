const express = require('express');
const server = express();
const cors = require('cors');

const fs = require('fs');

const multer = require('multer');
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${__dirname}/src/assets/static`);
    },
    filename: function (req, file, cb) {
      console.log(file);
      cb(null, file.originalname);
    },
  }),
});

server.use(cors());
server.use(express.json());
server.use(express.static(`${__dirname}/src/assets/static`));

server.get('/', (req, res, next) => {
  try {
    res.sendFile(`${__dirname}/dist`, (err) => {
      next(err);
    });
  } catch (error) {
    next(error);
  }
});

server.get('/assets', (req, res, next) => {
  try {
    fs.readdir(`${__dirname}/src/assets/static`, 'utf-8', (err, files) => {
      err ? console.log(err) : res.status(200).json(files);
    });
  } catch (error) {
    next(error);
  }
});

server.delete('/assets', (req, res, next) => {
  const { fileName } = req.body;
  console.log('log:', fileName);
  try {
    fs.unlink(`${__dirname}/public/assets/${fileName}`, (err) => {
      console.log('Error: ', err);
    });
    res.end();
  } catch (error) {
    next(error);
  }
});

server.post('/upload', upload.any(), (req, res, next) => {
  try {
    res.status(200).json({
      message: 'File Uploaded',
    });
  } catch (error) {
    next(error);
  }
});

server.listen('3000', function () {
  console.log('server listening in http://localhost:3000');
});
