const { Pool, Client } = require("pg");
const dotenv = require("dotenv");
if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: "./configs/prod.env" });
} else {
  dotenv.config({ path: "./configs/dev.env" });
}
const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  max: 200,
});

exports.getUsersByMSSV = async (mssv) => {
  const client = await pool.connect();
  try {
    res = await client.query("SELECT * FROM account WHERE mssv = $1", [mssv]);
    return res.rows[0];
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
};
