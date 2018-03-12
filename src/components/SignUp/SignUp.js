import React from 'react';

const SignUp = (props) => {
    return (
        <form className="login">
            <h1>SIGN UP</h1>
            <input type="email" name="email" placeholder="email" required></input>
            <input type="text" name="password" placeholder="password" required></input>
            <button btnType="Success" className="btn-lrg action">Sign Up</button>
        </form>
    );
};

export default SignUp;