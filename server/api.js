import { Router } from "express";
import db from "./db";

const router = new Router();

router.get("/", (req, res) => {
	res.json({ message: "Hello, world!" });
});

router.get("/bookings", async (req, res) => {
	try {
		const result = await db.query("SELECT booking.*,desk_user.username from booking INNER JOIN desk_user ON booking.desk_user_id=desk_user.id;"
		);
		// convert array with objects having {username, booking_date} into {name,date}
		const bookings = result.rows.map((row) => {
			return { id: row.id, name: row.username, table: row.desk_table, date: row.booking_date };
		});
		res.json(bookings);
	} catch (e) {
		console.error(e);
		res.sendStatus(400);
	}
});

router.post("/bookings", async function (req, res) {
	const userName = req.body.name;
	const tableName = req.body.table;
	const bookingDate = req.body.date;

	const insertQuery =
		"INSERT INTO booking (desk_user_id, desk_table, booking_date) VALUES ($1, $2, $3)";
	try {
		const userResult = await db.query(
			"SELECT id from desk_user WHERE username=$1",
			[userName]
		);
		const tableResult = await db.query(
			"SELECT id from desk_table WHERE desk_name=$2",
			[tableName]
		);
		if (userResult.rows.length === 0) {
			return res.status(400).send(`User with name ${userName} does not exist`);
		}
		const userId = userResult.rows[0].id;
		const tableId = tableResult.rows[0].id;
		const bookingResult = await db.query(insertQuery, [userId, tableId, bookingDate]);
		res.send("Booking created!");
	} catch (e) {
		console.error(e);
		res.sendStatus(400);
	}
});

export default router;
