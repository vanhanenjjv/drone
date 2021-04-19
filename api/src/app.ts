import express from 'express';
import * as database from './database';


const app = express();

app.get('/', (req, res) => {
  res.send('Okay. zoomer');
});

app.get('/drones', async (req, res) => {
  const drones = await database.drones();

  res.json(drones);
});

app.get('/users', async (req, res) => {
  const users = await database.users();

  res.json(users);
});

app.get('/sessions', async (req, res) => {
  const users = await database.sessions();

  res.json(users);
});


app.listen(8080);
