import { Router } from "express";
import db from "./db";

const router = new Router();

router.get("/", (req, res) => {
	res.json({ message: "Hello, world!" });
});

router.get("/bookings", (req, res) => {
	db.query("SELECT * from booking INNER JOIN desk_user ON booking.desk_user_id=desk_user.id;")
    .then((result) => res.json(result.rows))
	.catch((e) => {
		console.error(e);
		res.sendStatus(400);
	});
});

export default router;
