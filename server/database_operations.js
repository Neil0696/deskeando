const { Pool } = require("pg");
const { config } = require("./config");
const fs = require("fs");

const createSchema = fs
  .readFileSync(require.resolve("./recreate_schema.sql"))
  .toString();
const populateDb = fs
  .readFileSync(require.resolve("./populate_db.sql"))
  .toString();
const pool = new Pool(config);

queryDb(createSchema)
  .then(() => console.log("schema created successfully"))
  .then(() => queryDb(populateDb))
  .then(() => console.log("data populated successfully"))
  .then(() => process.exit(0));

function queryDb(query) {
  return pool.query(query).catch((error) => {
    console.log("error: ", error);
    process.exit(1);
    throw error;
  });
}