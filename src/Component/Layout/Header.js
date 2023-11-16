import React, { Fragment } from "react";
import classes from "./Header.module.css";
import HeaderButton from "./HeaderButton";

const Header = (props) => {
    return (
        <Fragment>
          <header className={classes.header}>
            <h1> Cafe World!</h1>
            <HeaderButton onClick={props.onShowCart} />
          </header>
        </Fragment>
         );
};
 export default Header;