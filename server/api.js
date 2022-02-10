import { Router } from "express";
import db from "./db";
import moment from "moment";

export const formatBookingDate = (d) => {
	return moment(d).format("ddd MMM Do");
};

const router = new Router();

router.get("/", (req, res) => {
	res.json({ message: "Hello, world!" });
});

router.get("/desks", async (req, res) => {
	try {
		const deskResult = await db.query("SELECT * from desk;");
		// convert array with objects having {username, booking_date} into {name,desk_id,desk,date}

		const desks = deskResult.rows.map((row) => {
			return {
				id: row.id,
				name: row.desk_name,
				x: row.x,
				y: row.y,
				r: row.r,
			};
		});
		res.json(desks);
	} catch (e) {
		console.error(e);
		res.sendStatus(400);
	}
});

router.get("/users", async (req, res) => {
	try {
		const queryResult = await db.query("SELECT * FROM desk_user");
		res.json(queryResult.rows);
	} catch (e) {
		console.error(e);
		res.sendStatus(400);
	}
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

		if (userResult.rows.length === 0) {
			return res.status(400).send({
				message: `${userName} does not exist`,
				field: "name",
			});
		}

		const bookingsByDayResult = await db.query(
			"select * from booking where booking_date = $1",
			[bookingDate]
		);

		if (bookingsByDayResult.rows.length >= 5) {
			return res.status(400).send({
				message: `No desks available for ${formatBookingDate(bookingDate)}`,
				field: "date",
			});
		}

		if (deskId) {
			const isDeskIdAlreadyTaken = bookingsByDayResult.rows.find(
				(e) => e.desk_id === deskId
			);
			if (isDeskIdAlreadyTaken) {
				return res.status(400).send({
					message: `Desk ${deskId} is already taken`,
					field: "desk",
				});
			}
		}

		const userId = userResult.rows[0].id;
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
