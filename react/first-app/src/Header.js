import React, {Component} from 'react';
import './App.css';
import Navigation from './Navigation';
import logo from './logo.svg';

const navigationData = [
    {text: 'Docs', href: '/docs/hello-world.html'},
    {text: 'Tutorial', href: '/tutorial/tutorial.html'},
    {text: 'Blog', href: '/blog/'},
];

class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <Navigation nav={navigationData}/>
            </header>
        );
    }
}

export default Header;