import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import Navigation from '../components/Navigation/Navigation';
import Races from '../components/Races/Races';
import Schedule from '../components/Schedule/Schedule';
import SignIn from '../components/User/SignIn';
import SignUp from '../components/User/SignUp';
import PasswordForgetPage from '../components/User/PasswordForget';
import AccountPage from '../components/User/Accounts';
import SavedSchedule from '../components/savedSchedule/SavedSchedule';
import Footer from '../components/Navigation/Footer/Footer';
import * as routes from '../constants/routes';
import withAuthentication from '../components/User/withAuthentication';

const App = () =>
            <Router>
                <div className='container'>
                    <Navigation/>
                    <main>

                    <Route
                        exact path={routes.LANDING}
                        component={() => <Races />}
                    />
                    <Route
                        exact path={routes.SIGN_UP}
                        component={() => <SignUp />}
                    />
                    <Route
                        exact path={routes.SIGN_IN}
                        component={() => <SignIn />}
                    />
                    <Route
                        exact path={routes.PASSWORD_FORGET}
                        component={() => <PasswordForgetPage />}
                    />
                    <Route
                        exact path={routes.HOME}
                        component={() => <Races />}
                    />
                    <Route
                        exact path={routes.ACCOUNT}
                        component={() => <AccountPage />}
                    />
                    <Route
                        exact path={routes.SCHEDULE + "/:id/:name"}
                        component={Schedule}
                    />
                    <Route
                        exact path={routes.SAVED_SCHEDULE}
                        component={SavedSchedule}
                    />
                    </main>
                    <Footer/>
                </div>
            </Router>;

export default withAuthentication(App);
