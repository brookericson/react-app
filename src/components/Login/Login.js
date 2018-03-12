import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <form className="login">
                <h1>LOG IN</h1>
                <input type="email" name="email" placeholder="email"></input>
                <input type="text" name="password" placeholder="password"></input>
                <button btnType="Success" className="btn-lrg action">Log In</button>
            </form>
        );
    }
};

export default Login;