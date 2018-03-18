import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../../index';

const PasswordForgetPage = () =>
    <div>
        <PasswordForgetForm />
    </div>;

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    email: '',
    error: null,
};

class PasswordForgetForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }
    onSubmit = (event) => {
        const { email } = this.state;

        auth.doPasswordReset(email)
            .then(() => {
                this.setState(() => ({ ...INITIAL_STATE }));
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });

        event.preventDefault();
    }

    render() {
        const {
            email,
            error,
        } = this.state;

        const isInvalid = email === '';

        return (
            <form onSubmit={this.onSubmit} className="login">
                <h1>Reset Password</h1>
                <input
                    value={this.state.email}
                    onChange={event => this.setState(byPropKey('email', event.target.value))}
                    type="text"
                    placeholder="Email Address"
                />
                <button disabled={isInvalid} type="submit" className="btn-lrg action">
                    Reset My Password
                </button>

                { error && <p>{error.message}</p> }
            </form>
        );
    }
}

const PasswordForgetLink = () =>
    <p className="link">
        <Link to="/pw-forget">Forgot Password?</Link>
    </p>

export default PasswordForgetPage;

export {
    PasswordForgetForm,
    PasswordForgetLink,
};
