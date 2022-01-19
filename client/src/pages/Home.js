import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./WeeklyTable";

import "./Home.css";
import logo from "./logo.svg";
import WeeklyTable from "./WeeklyTable";
import UsersData from "../Data/UsersData.json";

export function Home() {
	const [message, setMessage] = useState("Loading...");

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
			<WeeklyTable />
			
		</main>
	);
}

export default Home;
