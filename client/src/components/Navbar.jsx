import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import {Helmet} from 'react-helmet';
import userimage from '../images/programmer2.png';

function Navbar(props) {
    const url = '/dsatracker/userprofile/'+props.username;
    return (
        <div className='parentNv'>
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css2?family=Foldit:wght@100..900&display=swap" rel="stylesheet"/>
                <link rel="stylesheet" href="./style.css"/>
                <script src="https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js"></script>
            </Helmet>
            <div className="logoNv">DSA TRACKER</div>
            <div className="elementsNv">
                <div><button className='buttonNv'>Home</button></div>
                <div><button className='buttonNv'>Features</button></div>
                <div><button className='buttonNv'>About Us</button></div>
                <div className='userimagediv'>
                    <Link to={url}>
                        <img src={userimage} className='userphotoNv'/>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;