import React from 'react';

const SignUp = (props) => {
    return (
        <form>
            <label for="username">User Name</label>
            <input type="text" name="username"></input>
            <label for="username">password</label>
            <input type="text" name="password"></input>
            <input type="submit" value="Sign Up"></input>
        </form>
    );
};

export default SignUp;