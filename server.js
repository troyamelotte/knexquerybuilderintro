const env = 'development';
const config = require('./knexfile.js')[env];
const knex = require('knex')(config);
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
app.use(bodyParser.json());

// Get all pets
app.get('/pets', (req, res)=> {
  knex.raw("SELECT * FROM pets;").then((result) => {
    console.log(result)
    res.json(result.rows)
  })
  .catch((err) => {
    console.error(err)
  });
});
// Get one pet
app.get('/pets/:id', (req, res)=> {
  console.log(req.params.id);
  knex.raw(`SELECT * FROM pets WHERE id=${req.params.id};`).then((result) => {
    console.log(result)
    res.json(result.rows)
  })
  .catch((err) => {
    console.error(err)
  });
});

app.listen(port, function() {
  console.log('Listening on', port);
});
