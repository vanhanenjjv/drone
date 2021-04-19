import express, { json } from 'express';
import * as database from './database';


const app = express();

app.get('/', (req, res) => {
  res.send('Okay.');
});

app.get('/drones', async (req, res) => {
  const drones = await database.drones();

  database.users();

  res.json(drones);
});

app.listen(8080);
