import React from "react";

const desks = [
	{ id: 1, x: 0, y: 0, r: 0 },
	{ id: 2, x: 175, y: 0, r: 180 },
	{ id: 3, x: 0, y: 170, r: 0 },
	{ id: 4, x: 175, y: 170, r: 180 },
	{ id: 5, x: 0, y: 340, r: 0 },
	{ id: 6, x: 175, y: 340, r: 180 },
];

const Desk = (props) => {
	return (
		<g>
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
			<text fontSize={40} x={64} y={90}>
				{props.desk}
			</text>
		</g>
	);
};

const FloorPlan = () => {
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
						transform={`translate(${desk.x}, ${desk.y}) rotate(${desks.r}, 75, 75)`}
					>
						<Desk desk={desks.id} />
					</g>
				))}
				
				{/* <g transform="translate(0 0)">
					<Desk desk="1" />
				</g>
				<g transform="translate(175 0) rotate(180 75 75)">
					<Desk desk="2" transform="rotate(180)" />
				</g>
				<g transform="translate(0 170)">
					<Desk desk="3" />
				</g>
				<g transform="translate(175 170) rotate(180 75 75)">
					<Desk desk="4" />
				</g>
				<g transform="translate(0 340)">
					<Desk desk="5" />
				</g>
				<g transform="translate(175 340) rotate(180 75 75)">
					<Desk desk="6" />
				</g> */}
			</g>
		</svg>
	);
};

export default FloorPlan;
