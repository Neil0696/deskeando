import React, { useState, useEffect } from "react";
import WeeklyTable from "./WeeklyTable";
import "./Home.css";
import logo from "../assets/logo5.png";
import WeekChanger from "./WeekChanger";
import moment from "moment";

const MAX_DESKS_FOR_DAY = 5;

export function Home() {
	const [bookings, setBookings] = useState([]);
	const [desks, setDesks] = useState([]);
	const [refreshKey, setRefreshKey] = useState(0);
	const [users, setUsers] = useState([]);

	const startOfTheWeekDate = moment().startOf("isoWeek").toDate();
	const [currentMonday, setCurrentMonday] = useState(startOfTheWeekDate);
	let week = [];

	useEffect(() => {
		fetch("/api/bookings")
			.then((response) => response.json())
			.then(setBookings)
			.catch((err) => console.log(err));
	}, [refreshKey]);

	useEffect(() => {
		fetch("/api/desks")
			.then((response) => response.json())
			.then(setDesks)
			.catch((err) => console.log(err));
	}, []);

	useEffect(() => {
		fetch("/api/users")
			.then((response) => response.json())
			.then(setUsers)
			.catch((err) => console.log(err));
	}, []);

	const refreshBooking = () => {
		setRefreshKey((oldKey) => oldKey + 1);
	};

	return (
		<main role="main">
			<div>
				<WeekChanger
					week={week}
					currentMonday={currentMonday}
					setCurrentMonday={setCurrentMonday}
					startOfTheWeekDate={startOfTheWeekDate}
				/>
				<img
					className="logo"
					data-qa="logo"
					src={logo}
					alt="Just the Deskeando logo"
				/>
			</div>
			<div id="weekly-table">
				<WeeklyTable
					bookings={bookings}
					desks={desks}
					refreshBooking={refreshBooking}
					maxDesksForDay={MAX_DESKS_FOR_DAY}
					users={users}
					week={week}
				/>
			</div>
		</main>
	);
}

export default Home;
