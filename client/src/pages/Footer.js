import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => (
	<section id="footer">
		<div className="content">
			<Link className="about-link" to="/about/this/site">
				About
			</Link>
		</div>
	</section>
);

export default Footer;
