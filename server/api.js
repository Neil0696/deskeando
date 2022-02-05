import { Router } from "express";
import db from "./db";

const router = new Router();

const desks = [
	{ id: 1, name: "desk 1", x: 0, y: 0, r: 0 },
	{ id: 2, name: "desk 2", x: 175, y: 0, r: 180 },
	{ id: 3, name: "desk 3", x: 0, y: 170, r: 0 },
	{ id: 4, name: "desk 4", x: 175, y: 170, r: 180 },
	{ id: 5, name: "desk 5", x: 0, y: 340, r: 0 },
	{ id: 6, name: "desk 6", x: 175, y: 340, r: 180 },
];

router.get("/", (req, res) => {
	res.json({ message: "Hello, world!" });
});

router.get("/desks", (req, res) => {
	res.json(desks);
});

router.get("/bookings", async (req, res) => {
	try {
		const result = await db.query(
			"SELECT booking.*,desk_user.username,desk.desk_name from booking INNER JOIN desk_user ON booking.desk_user_id=desk_user.id LEFT OUTER JOIN desk ON booking.desk_id=desk.id "
		);
		// convert array with objects having {username, booking_date} into {name,desk_id,desk,date}
		const bookings = result.rows.map((row) => {
			return {
				id: row.id,
				name: row.username,
				desk_id: row.desk_id,
				desk: row.desk_name,
				date: row.booking_date,
			};
		});
		res.json(bookings);
	} catch (e) {
		console.error(e);
		res.sendStatus(400);
	}
});

router.delete("/bookings/:id", async function (req, res) {
	const deleteQuery = "DELETE FROM booking WHERE id=$1";
	try {
		const deletedBooking = await db.query(deleteQuery, [req.params.id]);
		res.send("Booking deleted!");
	} catch (e) {
		res.status(400).json({});
	}
});

router.post("/bookings", async function (req, res) {
	const userName = req.body.name;
	const deskId = req.body.desk_id;
	//const deskName = req.body.desk;
	const bookingDate = req.body.date;

	const insertQuery =
		"INSERT INTO booking (desk_user_id, desk_id, booking_date) VALUES ($1, $2, $3)";
	try {
		const userResult = await db.query(
			"SELECT id from desk_user WHERE username=$1",
			[userName]
		);
		// const tableResult = await db.query(
		// 	"SELECT id from desk WHERE desk_table_name=$2",
		// 	[deskName]
		// );
		if (userResult.rows.length === 0) {
			return res.status(400).send({
				message: `User with name ${userName} does not exist`,
				field: "name",
			});
		}
		const userId = userResult.rows[0].id;
		//const deskId = tableResult.rows[0].id;
		const bookingResult = await db.query(insertQuery, [
			userId,
			deskId,
			bookingDate,
		]);
		res.send("Booking created!");
	} catch (e) {
		console.error(e);
		res.status(400).json({});
	}
});

export default router;
