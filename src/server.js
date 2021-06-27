const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv/config');

const PORT = process.env.PORT;

const app = express();

app.use(cors())

app.use(bodyParser.json());

app.use('/', require('./route/employeeRoute'));

app.listen(PORT);
