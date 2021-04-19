import { Pool } from 'pg';
import { Drone, Picture, Session, User } from './entities';


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
  const result = await pool.query('SELECT * FROM drone');

  return result.rows;
}

export async function users(): Promise<User[]> {
  const result = await pool.query('SELECT * FROM user');

  return result.rows;
}

export async function sessions(): Promise<Session[]> {
  const result = await pool.query('SELECT * FROM drone_user');

  return result.rows;
}

export async function pictures(): Promise<Picture[]> {
  const result = await pool.query('SELECT * FROM pictures');

  return result.rows;
}
