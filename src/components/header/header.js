import React from 'react';
import './header.css';
// import LocaleSelector from '../locale.selector/locale.selector';


const Header = () => {
    return (
        <div className="app-header d-flex">
            <p className="logo">Fanfics</p>
            {/* <LocaleSelector /> */}
            <div className="d-flex justify-content-end">
                <button className="user-icon"></button>
            </div>
            

        </div>
    )
}


export default Header;