import React from 'react';

const Header = (props) => {
    let loginButton = null;
    if(props.loginState){
        loginButton = <li onClick={() => props.toggleLogout()}>LOG OUT</li>;
    }
    else{
        loginButton = <li onClick={() => props.toggleLogin()}>LOG IN</li>;
    }
    return (
        <header>
            <nav>
                <div className="logo">MT</div>
            <ul className="nav-list-container">
                {loginButton}
                <li onClick={() => props.toggleList()}>RACES</li>
                <li onClick={() => props.togglePlan()}>TRAINING PLAN</li>
            </ul>
            </nav>
        </header>
    );
};

export default Header;