'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
router.get('/', async(req, res) => {
  console.log("scj")
  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/ticker/price`,
      {
        method: "GET",
        headers: {},
      }
    );
    const data = await response.json();
    if (response.status === 200) {
     res.status(200).json(data)
    }
  } catch (err) {

  }
});
app.use(bodyParser.json());



app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/',async (req, res) => {
  try {
    const response = await fetch(
      `https://api.binance.com/api/v3/ticker/price`,
      {
        method: "GET",
        headers: {},
      }
    );
    const data = await response.json();
    if (response.status === 200) {
     res.status(200).json(data)
    }
  } catch (err) {
    res.status(400).json(err)
  }
});

module.exports = app;
module.exports.handler = serverless(app);
