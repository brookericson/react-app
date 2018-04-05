import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Aux from '../../hoc/Auxilliary';

import SignOutButton from '../User/SignOut';
import * as routes from '../../constants/routes';

const Navigation = (props, { authUser }) =>
    <header>
        <nav>
            { authUser
                ? <NavigationAuth/>
                : <NavigationNonAuth />
            }
        </nav>
    </header>;

    Navigation.contextTypes = {
        authUser: PropTypes.object,
    };

    const NavigationAuth = () =>
        <Aux>
        <ul className="nav-list-container">
            <li><strong id="logo">MARATHON TRAINER</strong></li>
            <li><NavLink to={routes.LANDING}>RACE SEARCH</NavLink></li>
            <li><NavLink to={routes.SAVED_SCHEDULE}>TRAINING SCHEDULE</NavLink></li>
        </ul>
        <span><SignOutButton /></span>
        </Aux>
    const NavigationNonAuth = () =>
        <Aux>
        <ul className="nav-list-container">
            <li><strong id="logo">MARATHON TRAINER</strong></li>
            <li><NavLink to={routes.LANDING}>RACE SEARCH</NavLink></li>
        </ul>
        <NavLink to={routes.SIGN_IN}>SIGN IN</NavLink>
        </Aux>
export default Navigation;