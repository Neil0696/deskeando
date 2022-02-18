import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";

const Header = () => (
	<section>
		<div className="about">
			<Link className="about-link" to="/about/this/site">About</Link>
		</div>
	</section>
);

export default Header;
