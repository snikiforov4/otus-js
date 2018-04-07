import React, {Component} from 'react';
import './App.css';
const reactURL = 'https://reactjs.org';

class Navigation extends Component {
    render() {
        const navContent = this.props.nav.map(({text, href}) => {
            return (
                <a key={href} href={`${reactURL}${href}`}>{text}</a>
            );
        });

        return (
            <nav className="App-nav">
                {navContent}
            </nav>
        );
    }
}

export default Navigation;