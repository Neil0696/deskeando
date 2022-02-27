import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import hero from "../assets/Deskeando-Hero.png";
import "./Hero.css";

export function Hero() {
	
	return (
		<div className="container">
			<Link to="/home">book a desk</Link>
			<p>something</p>
			{/* <Link to="/">Home</Link> */}
			{/* <img className="background-img" src={hero} alt="Deskeando Background" /> */}
			{/* <Link to="/about/this/site">About</Link> */}
		</div>
	);
}

export default Hero;
