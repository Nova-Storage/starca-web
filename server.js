const express = require('express')
const app = express()
const fs = require('fs')
const pgp = require('pg-promise')()

app.use(express.json());

const connection = {
  user: process.env.REACT_APP_PGUSER,
  host: process.env.REACT_APP_PGHOST,
  database: process.env.REACT_APP_PGDATABASE,
  password: process.env.REACT_APP_PGPASSWORD,
  port: process.env.REACT_APP_PGPORT
}
const db = pgp(connection)


app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.listen(process.env.PORT);

