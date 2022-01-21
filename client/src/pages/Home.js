import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// import UsersData from "../Data/UsersData";
import WeeklyTable from "./WeeklyTable";

import "./Home.css";
import logo from "./logo.svg";

export function Home() {
	const [message, setMessage] = useState("Loading...");

	const [result, setResult] = useState([]);

	useEffect(() => {
		fetch("/api")
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then((body) => {
				setMessage(body.message);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	useEffect(() => {
		fetch("/api/bookings")
			.then((response) => response.json())
			.then((data) => {
				// console.log(data, "DATA");
				setResult(data);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<main role="main">
			<div>
				<img
					className="logo"
					data-qa="logo"
					src={logo}
					alt="Just the React logo"
				/>
				<h1 className="message" data-qa="message">
					{message}
				</h1>
				<Link to="/about/this/site">About</Link>
			</div>
			<WeeklyTable bookings={result}/>
  </main>
	);
}

export default Home;
