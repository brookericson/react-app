import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from './SignUp';
import { PasswordForgetLink } from './PasswordForget';
import { auth } from '../../index';
import * as routes from '../../constants/routes';

const SignInPage = ({ history }) =>
    <div>
        <SignInForm history={history} />
    </div>

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event) => {
        const {
            email,
            password,
        } = this.state;

        const {
            history,
        } = this.props;

        auth.doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState(() => ({ ...INITIAL_STATE }));
                this.setState({ user: email });
                history.push(routes.HOME);
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });

        event.preventDefault();
    };

    render() {
        const {
            email,
            password,
            error,
        } = this.state;

        const isInvalid =
            password === '' ||
            email === '';

        return (
            <form className="login">
                <h1>Sign In</h1>
                <input
                    value={email}
                    onChange={event => this.setState(byPropKey('email', event.target.value))}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    value={password}
                    onChange={event => this.setState(byPropKey('password', event.target.value))}
                    type="password"
                    placeholder="Password"
                />
                <button disabled={isInvalid} type="button" onClick={this.onSubmit} className="btn-lrg action">
                    Sign In
                </button>

                { error && <p>{error.message}</p> }
                <SignUpLink/>
                <PasswordForgetLink />
                <SignUpLink/>
            </form>
        );
    }
}

export default withRouter(SignInPage);

export {
    SignInForm,
};