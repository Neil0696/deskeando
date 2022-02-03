import React from "react";

const Desk = ({ desk }) => {
	return (
		<>
			<g transform={`rotate(${desk.r} 75 75)`}>
				<rect
					style={{
						fill: "#3F94D5",
						stroke: "#000000",
						strokeWidth: "1",
						fillOpacity: 0.6,
					}}
					width={150}
					height={150}
					x={0.5}
					y={0.5}
					rx={15}
				/>
				<circle cx="-55" cy="75" r="35" />
			</g>
			<text fontSize={40} x={64} y={90}>
				{desk.id}
			</text>
		</>
	);
};

const FloorPlan = ({ desks }) => {
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
					<g
						key={i}
						transform={`translate(${desk.x} ${desk.y})`}
					>
						<Desk desk={desk} />
					</g>
				))}
			</g>
		</svg>
	);
};

export default FloorPlan;
