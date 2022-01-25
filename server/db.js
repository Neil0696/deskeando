import { Pool } from "pg";
import { config } from "./config.js";

//const dbUrl = process.env.DATABASE_URL || "postgres://localhost:5432/cyf";

const pool = new Pool(config);

export const connectDb = async () => {
	let client;
	try {
		client = await pool.connect();
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
	console.log("Postgres connected to", client.database);
	client.release();
};

export const disconnectDb = () => pool.close();

export default { query: pool.query.bind(pool) };
