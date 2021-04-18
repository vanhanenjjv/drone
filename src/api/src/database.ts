import { Pool } from 'pg';
import { Drone } from './types';

const pool = new Pool({
  host:     process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  user:     process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD
});

pool.connect().catch(console.error);

async function drones(): Promise<Drone[]> {
  const result = await pool.query("SELECT * FROM drone");

  return result.rows;
}

export default { drones };
