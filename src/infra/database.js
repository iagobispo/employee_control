
require('dotenv/config');
var pg = require('pg');

const DATABASE_KEY = process.env.DATABASE_KEY;
var client = new pg.Client(DATABASE_KEY);

client.connect(function (err) {
  if (err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', function (err, result) {
    if (err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
  });

});

module.exports = client;
