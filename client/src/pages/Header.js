import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";

const Header = () => (
	<section className="header">
		<div className="menu">
			<Link className="about" to="/about/this/site">
				About
			</Link>
		</div>
	</section>
);

export default Header;
