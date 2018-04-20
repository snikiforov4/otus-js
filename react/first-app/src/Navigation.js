import React, {Component} from 'react';
import './App.css';
const reactURL = 'https://reactjs.org';

class Navigation extends Component {
    render() {
        const navContent = this.props.nav.map(({text, href}) => {
            return (
                <a key={href} href={`${reactURL}${href}`} target='_blank'>{text}</a>
            );
        });

        return (
            <nav className="AppNav">
                {navContent}
            </nav>
        );
    }
}

export default Navigation;
