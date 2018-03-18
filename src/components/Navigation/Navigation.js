import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
            <li><Link to={routes.LANDING}>RACE SEARCH</Link></li>
            <li><Link to={routes.SCHEDULE}>TRAINING SCHEDULE</Link></li>
            <li><Link to={routes.ACCOUNT}>ACCOUNT</Link></li>
            <li><SignOutButton /></li>
        </ul>

    const NavigationNonAuth = () =>
        <ul className="nav-list-container">
            <li><Link to={routes.LANDING}>RACE SEARCH</Link></li>
            <li><Link to={routes.SIGN_IN}>SIGN IN</Link></li>
        </ul>

export default Navigation;