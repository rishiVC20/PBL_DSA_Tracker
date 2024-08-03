import React from 'react';
import {Helmet} from 'react-helmet';
import '../styles/LandingPage.css';
import {Link} from 'react-router-dom';
import sideImg from '../images/Landing_sideimg.png';
import {TypeAnimation} from 'react-type-animation';

function LandingPage(){
    return (
    <div>
        <Helmet>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
            <link href="https://fonts.googleapis.com/css2?family=Foldit:wght@100..900&display=swap" rel="stylesheet"/>
            <link rel="stylesheet" href="./style.css"/>
            <script src="https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js"></script>
        </Helmet>

        <div className='parentdivLP'>
            <div className="containerLP">
                <div className="logo"><p className="fun">DSA TRACKER</p></div>
                <div className="elements">
                    {/* <button className="home button">Home</button> */}
                    <button className="features button">Features</button>
                    <button className="about button">About Us</button>
                    <Link to='/dsatracker/login'>
                        <button className="login button">Login</button>
                    </Link>
                    <Link to='/dsatracker/signup'>
                        <button className="signup button">SignUp</button>
                    </Link>
                </div>
            </div>
            <div className="container1">
                <div className="heading">
                    <div className="text">
                        <h1 className='h1LP'>Facing difficulties in<br/>
                        <div className="auto-type">{''}
                        <TypeAnimation
                            sequence={['Stack', 2000, 'Array', 2000, 'Linked List', 2000, 'Queue', 2000, 'Graph', 2000, 'Strings', 2000, 'Trees', 2000, 'Recursion', 2000]}
                            wrapper="span"
                            speed={40}
                            repeat={Infinity}
                        />
                        </div></h1>
                        <p style={{color: "white", marginTop: "5%", fontSize: "large"}}>Practice DSA problems and boost your DSA skills with DSA Tracker<br/>Practice | Score | Succeed</p>
                        <p style={{fontSize: "24px", color: "white", marginTop: "5%"}}>Let's Track It !</p>
                        <Link to='/dsatracker/signup'>
                            <button className="get-started"><b>Get Started</b></button>
                        </Link>
                    </div>
                </div>
                <div className="sideimg">
                    <img className="LandingSideImg" src={sideImg} height={400} width={400} />
                </div>
            </div>
        </div>
    </div>
)};

export default LandingPage;