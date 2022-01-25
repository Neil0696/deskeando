const dbUrl = process.env.DATABASE_URL || "postgres://localhost:5432/cyf";

const config = {
	connectionString: dbUrl,
	connectionTimeoutMillis: 5000,
	ssl: dbUrl.includes("localhost") ? false : { rejectUnauthorized: false },
};
module.exports = {
	config,
};