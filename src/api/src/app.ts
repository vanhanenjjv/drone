import express, { json } from 'express';
import database from './database';

const app = express();

app.get('/', (req, res) => {
  res.send("Okay.");
});

app.get('/drones', async (req, res) => {
  const drones = await database.drones();

  res.json(drones);
});

app.listen(8080);
