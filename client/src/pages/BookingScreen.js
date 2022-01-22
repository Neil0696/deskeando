import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";


const BookingScreen = ({ bookingDate }) => {
	const [name, setName] = useState("");
	
	let history = useHistory();

    const handleSubmit = (event) => {
		event.preventDefault();
		
		fetch("/api/bookings", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
			"name": name, "date": bookingDate 
			}),
		})
		.then(() => {
			history.push("/")
		})
	};



    return (
			<form onSubmit={handleSubmit}>
				<label>
					Name:
					<input
						type="text"
						value={name}
						onChange={(event) => setName(event.target.value)}
					/>
				</label>
				<br />
				<label>
					Date:
					<input type="text" value={bookingDate} disabled></input>
				</label>
				<br />
				<label>
					I don't care where I sit:
					<input type="checkbox" />
				</label>
				<br />
				<input type="submit" value="Create Booking" />
			</form>
		);
}

export default BookingScreen;