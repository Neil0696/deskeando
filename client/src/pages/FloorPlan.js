import React from "react";
import "./FloorPlan.css";

const Desk = ({ desk, booking }) => {
	const deskColor = `${booking ? "booked-desk" : "free-desk"}`;
	return (
		<>
			<g>
				<rect
					className={deskColor}
					width={112}
					height={160}
					x={0.5}
					y={0.5}
					rx={15}
				/>
			</g>
			<g className={deskColor} transform={`rotate(${desk.r} 56 80)`}>
				<path
					d="M44.461,47.852a9.858,9.858,0,0,1-10.115-9.57,9.858,9.858,0,0,1,10.115-9.57,9.858,9.858,0,0,1,10.115,9.57,9.858,9.858,0,0,1-10.115,9.57m0-23.926c-8.381,0-15.173,6.427-15.173,14.356s6.792,14.356,15.173,14.356,15.173-6.427,15.173-14.356S52.842,23.926,44.461,23.926M9.058,36.377c0-16.83,16.544-31.592,35.4-31.592s35.4,14.762,35.4,31.592c0,16.533-12.963,36.095-35.4,69.515-22.7-33.846-35.4-52.982-35.4-69.515M44.461,0C23.229,0,4,16.284,4,36.377s17.545,44.072,40.461,78.468c22.916-34.4,40.461-58.38,40.461-78.468S65.7,0,44.461,0"
					transform="translate(-115 120) rotate(-90)"
				/>
			</g>
			<g fill="white" text-anchor="middle" transform="translate(56 90)">
				<text fontSize={45}>
					{desk.id}
				</text>
				<text fontSize={25} y={50}>
					{booking?.name}
				</text>
			</g>
		</>
	);
};

const FloorPlan = ({ desks, bookings }) => {
	const bookingsByDesk = {};
	bookings.forEach((booking) => {
		bookingsByDesk[booking.desk_id] = booking;
	});

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="390"
			height="330"
			viewBox="0 0 650 660"
		>
			<rect
				style={{ fill: "#fff", stroke: "#000000", strokeWidth: "2" }}
				id="Rect7"
				width="649"
				height="657"
				x="0.5"
				y="0.5"
			/>
			<g id="Group1" transform="translate(210 85)">
				{desks.map((desk, i) => (
					<g key={i} transform={`translate(${desk.x} ${desk.y})`}>
						<Desk desk={desk} booking={bookingsByDesk[desk.id]} />
					</g>
				))}
			</g>
		</svg>
	);
};

export default FloorPlan;
