import React from "react";
import "./FloorPlan.css";

const Desk = ({ desk, booking, deskId, setDeskId }) => {
	const deskColor = `${
		booking ? "booked-desk" : deskId === desk.id ? "selected" : "free-desk"
	}`;
	return (
		<g
			transform={`translate(${desk.x} ${desk.y})`}
			onClick={() => {
				if (!booking) {
					if (deskId === desk.id) {
						setDeskId(null);
					} else setDeskId(desk.id);
				}
			}}
		>
			<g transform={`rotate(${desk.r} 75 75)`}>
				<rect
					className={deskColor}
					width={150}
					height={150}
					x={0.5}
					y={0.5}
					rx={15}
				/>
				<circle className={deskColor} cx="-55" cy="75" r="35" />
			</g>
			<text fontSize={40} x={64} y={90}>
				{desk.id}
			</text>
			<text fontSize={25} x={20} y={140}>
				{booking?.name}
			</text>
		</g>
	);
};

const FloorPlan = ({ desks, bookings, deskId, setDeskId }) => {
	const bookingsByDesk = {};
	bookings.forEach((booking) => {
		bookingsByDesk[booking.desk_id] = booking;
	});

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="848"
			height="875"
			viewBox="0 0 848 875"
		>
			<rect
				style={{ fill: "#fff", stroke: "#000000", strokeWidth: "1" }}
				id="Rect7"
				width="847"
				height="874"
				x="0.5"
				y="0.5"
			/>
			<g id="Group1" transform="translate(262 100)">
				{desks.map((desk, i) => (
					<Desk
						key={i}
						desk={desk}
						booking={bookingsByDesk[desk.id]}
						deskId={deskId}
						setDeskId={setDeskId}
					/>
				))}
			</g>
		</svg>
	);
};

export default FloorPlan;
