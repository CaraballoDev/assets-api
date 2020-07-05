const express = require('express');
const cors = require('cors');
const server = express();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/public/assets`);
  },
  filename: function (req, file, cb) {
    console.log(file);

    cb(null, file.originalname);
  },
});
const upload = multer({ dest: 'uploads/', storage: storage });

server.use(cors());
server.use(express.json());
server.use(express.static(`${__dirname}/public`));

server.get('/', (req, res, next) => {
  try {
    res.sendFile(`${__dirname}/public`, (err) => {
      next(err);
    });
  } catch (error) {
    next(error);
  }
});

server.post('/upload', upload.any(), (req, res, next) => {
  try {
    console.log(req.file);

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
