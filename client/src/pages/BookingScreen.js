import React from "react";
import { useState } from "react";

const BookingScreen = () => {
    const [name, setName] = useState("");
    const [bookingDate, setBookingDate] = useState("11/01/2022");

    const handleSubmit = (event) => {
		alert("Your booking date is: " + bookingDate);
        event.preventDefault();
	}

    const handleChange = (e) => {
        setBookingDate(e.target.value)
    }

    return (
			<form onSubmit={handleSubmit}>
				<lable>
					Name:
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</lable>
				<br />
				<lable>
					Date:
					<select type="date" value={bookingDate} onChange={handleChange}>
						<option value="11/01/2022">11/01/2022</option>
						<option value="12/02/2022">12/02/2022</option>
						<option value="13/03/2022">13/03/2022</option>
						<option value="14/04/2022">14/04/2022</option>
					</select>
				</lable>
				<br />
				<lable>
					I don't care where I sit:
					<input type="checkbox" />
				</lable>
				<br />
				<input type="submit" checked={true} value="Create Booking" />
			</form>
		);
}

export default BookingScreen;