const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const events = require('./events');

const port = process.env.PORT || 8080;

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(events());
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});