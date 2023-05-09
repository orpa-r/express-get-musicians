const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

//TODO: Create a GET /musicians route to return all musicians 
app.get('/musicians', async (req, res) => {
    const musicians = await Musician.findAll();
    res.json(musicians);
  });

app.get('/musicians/:id', async (req, res) => {
    const { id } = req.params;
    const musician = await Musician.findByPk(id);
    res.json(musician);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// adding
app.post('/musicians', async (req, res) => {
  const { name, genre } = req.body;
  const musician = await Musician.create({ name, genre });
  res.json(musician);
});

// replacing an existing
app.put('/musicians/:id', async (req, res) => {
  const { id } = req.parameters;
  const { name, genre } = req.body;
  await Musician.update({ name, genre }, { where: { id } });
  const musician = await Musician.findByPk(id);
  res.json(musician);
});

// deleteing
app.delete('/musicians/:id', async (req, res) => {
  const { id } = req.parameters;
  await Musician.destroy({ where: { id } });
  res.json({ message: 'Musician deleted successfully' });
});

module.exports = app;