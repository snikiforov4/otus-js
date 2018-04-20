import React, {Component} from 'react';
import './App.css';
import Navigation from './Navigation';
import logo from './logo.svg';

const navigationData = [
    {text: 'Docs', href: '/docs/hello-world.html'},
    {text: 'Tutorial', href: '/tutorial/tutorial.html'},
    {text: 'Community', href: '/community/support.html'},
    {text: 'Blog', href: '/blog/'},
];

class Header extends Component {
    render() {
        return (
            <header className="AppHeader">
                <div className="container">
                    <img src={logo} className="AppLogo" alt="logo"/>
                    <Navigation nav={navigationData}/>
                </div>
            </header>
        );
    }
}

export default Header;
