import { Pool } from 'pg';
import { Drone, Picture, User } from './entities';


const pool = new Pool({
  host:     process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  user:     process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD
});

pool.connect().catch(reason => {
  console.error(reason);
  process.exit(1);
});

export async function drones(): Promise<Drone[]> {
  const result = await pool.query('SELECT * FROM drones');

  return result.rows;
}

export async function users(): Promise<User[]> {
  const result = await pool.query('SELECT * FROM users');

  return result.rows;
}

export async function pictures(): Promise<Picture[]> {
  const result = await pool.query('SELECT * FROM pictures');

  return result.rows;
}
