import React from 'react';

const Header = (props) => {
    let loginButton = null;
    if(props.loginState){
        loginButton = <li onClick={() => props.toggleLogout()}>Log Out</li>;
    }
    else{
        loginButton = <li onClick={() => props.toggleLogin()}>Log In</li>;
    }
    return (
        <header>
            <nav>
                <div>
                    <img src="logo.png" alt="logo">
                    </img>
                </div>
            <ul>
                {loginButton}
                <li onClick={() => props.toggleList()}>Race List</li>
                <li onClick={() => props.togglePlan()}>Training Plan</li>
            </ul>
            </nav>
        </header>
    );
};

export default Header;