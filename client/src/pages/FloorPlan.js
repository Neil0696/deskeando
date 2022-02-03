import React from "react";

const Desk = (props) => {
	return (
		<g>
			<rect
				style={{ fill: "#fff", stroke: "#000000", strokeWidth: "1" }}
				width={150}
				height={150}
				x={0.5}
				y={0.5}
			/>
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
				<g transform="translate(0 0)">
					<Desk desk="1" />
				</g>
				<g transform="translate(175 0)">
					<Desk desk="2" />
				</g>
				<g transform="translate(0 170)">
					<Desk desk="3" />
				</g>
				<g transform="translate(175 170)">
					<Desk desk="4" />
				</g>
				<g transform="translate(0 340)">
					<Desk desk="5" />
				</g>
				<g transform="translate(175 340)">
					<Desk desk="6" />
				</g>
			</g>
		</svg>
	);
};

export default FloorPlan;
