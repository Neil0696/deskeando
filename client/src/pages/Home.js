import React, { useState, useEffect } from "react";
import WeeklyTable from "./WeeklyTable";
import "./Home.css";
import logo from "../assets/logo5.png";

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
			<div>
				<img
					className="logo"
					data-qa="logo"
					src={logo}
					alt="Just the Deskeando logo"
				/>

				{/* <Link to="/about/this/site">About</Link> */}
			</div>
			<WeeklyTable
				bookings={bookings}
				desks={desks}
				refreshBooking={refreshBooking}
				maxDesksForDay={MAX_DESKS_FOR_DAY}
				users={users}
			/>
		</main>
	);
}

export default Home;
