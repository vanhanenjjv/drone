import { Pool } from 'pg';


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


export default pool;
