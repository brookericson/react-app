import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import SignOutButton from '../User/SignOut';
import * as routes from '../../constants/routes';

const Navigation = (props, { authUser }) =>
    <header>
        <nav>
            <div className="logo">MT</div>
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
        <ul className="nav-list-container">
            <li><NavLink to={routes.LANDING}>RACE SEARCH</NavLink></li>
            <li><NavLink to={routes.SCHEDULE}>TRAINING SCHEDULE</NavLink></li>
            <li><NavLink to={routes.ACCOUNT}>ACCOUNT</NavLink></li>
            <li><SignOutButton /></li>
        </ul>

    const NavigationNonAuth = () =>
        <ul className="nav-list-container">
            <li><NavLink to={routes.LANDING}>RACE SEARCH</NavLink></li>
            <li><NavLink to={routes.SIGN_IN}>SIGN IN</NavLink></li>
        </ul>

export default Navigation;