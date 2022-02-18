import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => (
	<section className="">

		<Link className="about-link" to="/about/this/site">
			About
		</Link>
	</section>
);

export default Footer;