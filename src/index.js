require('dotenv').config();

const container = require('./container');
const express = require('express');
const gracefulStopper = require('./infrastructure/gracefulStopper');
gracefulStopper.registerGracefulStopper();
const app = express();

const port = process.env.PORT || 3000;
const secretOrNot = process.env.SECRET || 'NotASecret';


app.use('/', (req,res) => {
  res.status(200).json({response: 'OK', secretOrNot});
})

app.get('/internal/liveness', (req, res) => {
  res.status(200).json({response: "I'm alive"});
});

app.get('/internal/readyness', (req, res) => {
  const dbHandler = container.resolve('mongoDbHandler');
  if (dbHandler.getInstance()) return res.status(200).json({response: "I'm ready"});
  return res.status(500).json({response: "Not ready"});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
