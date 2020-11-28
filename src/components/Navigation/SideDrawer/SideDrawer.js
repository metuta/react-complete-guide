import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Auxiliary from "../../../hoc/Auxiliary";

const sideDrawer = (props) => {
  const sideClass = [classes.SideDrawer];
  props.open ? sideClass.push(classes.Open) : sideClass.push(classes.Close);
  return (
    <Auxiliary>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={sideClass.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Auxiliary>
  );
};

export default sideDrawer;
