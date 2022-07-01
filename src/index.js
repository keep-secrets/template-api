require('dotenv').config();
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
const secretOrNot = process.env.SECRET || 'NotASecret';

app.use('/', (req,res) => {
  res.status(200).json({response: 'OK', secretOrNot});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
