import React, { useState, useEffect } from "react";
import WeeklyTable from "./WeeklyTable";
import "./Home.css";
import logo from "../assets/Deskeando-Logo.png";

const MAX_DESKS_FOR_DAY = 5;

export function Home() {
	const [bookings, setBookings] = useState([]);
	const [desks, setDesks] = useState([]);
	const [refreshKey, setRefreshKey] = useState(0);
	const [users, setUsers] = useState([]);

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
			<div id="wrapper">
				<div className="wrapper-inner1">
					<img src={logo} alt="Deskeando Logo" />
				</div>
				<div className="wrapper-inner2">
					<WeeklyTable
						bookings={bookings}
						desks={desks}
						refreshBooking={refreshBooking}
						maxDesksForDay={MAX_DESKS_FOR_DAY}
						users={users}
					/>
				</div>
			</div>
		</main>
	);
}

export default Home;
