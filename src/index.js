require('dotenv').config();

const container = require('./container');
const express = require('express');
const {gracefulStopper} = require('./infrastructure/gracefulStopper');

const app = express();

const port = process.env.PORT || 3000;
const secretOrNot = process.env.SECRET || 'NotASecret';

const signals = ['SIGTERM', 'SIGINT', 'SIGUSR1', 'SIGUSR2'];
signals.map(signal => process.on(signal, () => {
  gracefulStopper();
}));

const internalRoutes = require('./infrastructure/http/internal-controller');


app.use('/', (req,res) => {
  res.status(200).json({response: 'OK', secretOrNot});
});

app.use('/internal', internalRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
