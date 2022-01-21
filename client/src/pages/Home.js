import { Link } from "react-router-dom";
import UsersData from "../Data/UsersData";
import WeeklyTable from "./WeeklyTable";
import "./Home.css";
import logo from "./logo.svg";

const ROWS_COUNT = 3;

export function Home() {

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

				<Link to="/about/this/site">About</Link>
			</div>
			<WeeklyTable bookings={UsersData} rowsCount={ROWS_COUNT} />
  </main>
	);
}

export default Home;
