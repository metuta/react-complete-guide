import React from "react";
import { Link } from "react-router-dom";

import classes from "./Logo.css";
import burgerLogo from "../../assets/images/burger-logo.png";

const logo = (props) => (
	<div className={classes.Logo}>
		<Link to="/">
			<img src={burgerLogo} alt="MyBurger" />
		</Link>
	</div>
);

export default logo;
