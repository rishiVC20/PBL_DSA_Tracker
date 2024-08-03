import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import '../styles/Login.css';
import axios from 'axios';

function Login(){
    const [user, setUser] = useState({
        username : "",
        password : "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target
        setUser({
            ...user,
            [name] : value,
        })
    }

    const navigate = useNavigate();

    const navigateToHome = () => {
        navigate(`/dsatracker/home/${user.username}`);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/dsatracker/login", user)
        .then(res => {
            alert(res.data.message);
            if(res.data.message === 'Login successful'){
                navigateToHome();
            }
        });
    }

    const sendCode = () => {
        const username = prompt("Enter Username to reset password");
        axios.post("http://localhost:3001/dsatracker/login/forgotpassword", {username})
        .then((res) => {
            alert(res.data.message);
            if(res.data.message === 'One time verification code has been sent to your registered email id'){
                const token = prompt("Enter the verification code");
                const newpassword = prompt("Enter new password");
                axios.post('http://localhost:3001/dsatracker/login/resetpassword', {username, token, newpassword})
                .then(res => {
                    alert(res.data.message);
                })
            }
        });
    }

    return(
    <div className='parentLg'>
        <div className="containerLg">
            <form onSubmit={handleSubmit}>
                <h1 className='h1Lg'>Login</h1>
                <div className="user box">
                    <input type="text" placeholder="Username" name='username' value={user.username} onChange={handleChange} required></input>
                    <i className="fa-solid fa-user"></i>
                </div>
                <div className="pass box">
                    <input type="password" placeholder="Password" name='password' value={user.password} onChange={handleChange} required></input>
                    <i className="fa-solid fa-lock"></i>
                </div>
                <div className="forgot">
                    <Link onClick={sendCode}>Forgot Password?</Link>
                </div>

                <button className="btn" type='submit'>Login</button>

                <div className="register">
                    <p>Don't have an account? <Link to='/dsatracker/signup'>Register</Link></p>
                </div>
            </form>
        </div>

        <div className="wrap">

            {/* <!-- 1.Paste --> */}
            <svg className="svg" xmlns="http://www.w3.org/2000/svg" height="360" width="180" viewBox="0 0 512 512"> <path fill="cyan" d="M104.6 48H64C28.7 48 0 76.7 0 112V384c0 35.3 28.7 64 64 64h96V400H64c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H80c0 17.7 14.3 32 32 32h72.4C202 108.4 227.6 96 256 96h62c-7.1-27.6-32.2-48-62-48H215.4C211.6 20.9 188.2 0 160 0s-51.6 20.9-55.4 48zM144 56a16 16 0 1 1 32 0 16 16 0 1 1 -32 0zM448 464H256c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16l140.1 0L464 243.9V448c0 8.8-7.2 16-16 16zM256 512H448c35.3 0 64-28.7 64-64V243.9c0-12.7-5.1-24.9-14.1-33.9l-67.9-67.9c-9-9-21.2-14.1-33.9-14.1H256c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64z"/></svg>

            {/* <!-- 2.Snippet --> */}
            <svg className="svg" xmlns="http://www.w3.org/2000/svg" height="360" width="480" viewBox="0 0 640 512"> <path fill="cyan" d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"/></svg>

            {/* <!-- 3.Plus-Minus --> */}
            <svg className="svg" xmlns="http://www.w3.org/2000/svg" height="180" width="144" viewBox="0 0 384 512"> <path fill="cyan" d="M224 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H160V320c0 17.7 14.3 32 32 32s32-14.3 32-32V208H336c17.7 0 32-14.3 32-32s-14.3-32-32-32H224V32zM0 480c0 17.7 14.3 32 32 32H352c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-17.7 0-32 14.3-32 32z"/></svg>

            {/* <!-- 4.Terminal --> */}
            <svg className="svg" xmlns="http://www.w3.org/2000/svg"  width="160" height="160" viewBox="0 0 576 512"> <path fill="cyan" d="M9.4 86.6C-3.1 74.1-3.1 53.9 9.4 41.4s32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 9.4 86.6zM256 416H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>

            {/* <!-- 5.Laptop --> */}
            <svg className="svg" xmlns="http://www.w3.org/2000/svg" width="280" height="180"  viewBox="0 0 640 512"> <path fill="cyan" d="M64 96c0-35.3 28.7-64 64-64H512c35.3 0 64 28.7 64 64V352H512V96H128V352H64V96zM0 403.2C0 392.6 8.6 384 19.2 384H620.8c10.6 0 19.2 8.6 19.2 19.2c0 42.4-34.4 76.8-76.8 76.8H76.8C34.4 480 0 445.6 0 403.2zM281 209l-31 31 31 31c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-48-48c-9.4-9.4-9.4-24.6 0-33.9l48-48c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM393 175l48 48c9.4 9.4 9.4 24.6 0 33.9l-48 48c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l31-31-31-31c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"/></svg>

            {/* <!-- 1.Paste --> */}
            <svg className="svg" xmlns="http://www.w3.org/2000/svg" height="120" width="80" viewBox="0 0 512 512"> <path fill="cyan" d="M104.6 48H64C28.7 48 0 76.7 0 112V384c0 35.3 28.7 64 64 64h96V400H64c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H80c0 17.7 14.3 32 32 32h72.4C202 108.4 227.6 96 256 96h62c-7.1-27.6-32.2-48-62-48H215.4C211.6 20.9 188.2 0 160 0s-51.6 20.9-55.4 48zM144 56a16 16 0 1 1 32 0 16 16 0 1 1 -32 0zM448 464H256c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16l140.1 0L464 243.9V448c0 8.8-7.2 16-16 16zM256 512H448c35.3 0 64-28.7 64-64V243.9c0-12.7-5.1-24.9-14.1-33.9l-67.9-67.9c-9-9-21.2-14.1-33.9-14.1H256c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64z"/></svg>

            {/* <!-- 2.Snippet --> */}
            <svg className="svg" xmlns="http://www.w3.org/2000/svg" height="108" width="84" viewBox="0 0 640 512"> <path fill="cyan" d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"/></svg>

            {/* <!-- 3.Plus-Minus --> */}
            <svg className="svg" xmlns="http://www.w3.org/2000/svg" height="96" width="72" viewBox="0 0 384 512"> <path fill="cyan" d="M224 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H160V320c0 17.7 14.3 32 32 32s32-14.3 32-32V208H336c17.7 0 32-14.3 32-32s-14.3-32-32-32H224V32zM0 480c0 17.7 14.3 32 32 32H352c17.7 0 32-14.3 32-32s-14.3-32-32-32H32c-17.7 0-32 14.3-32 32z"/></svg>

            {/* <!-- 4.Terminal --> */}
            <svg className="svg" xmlns="http://www.w3.org/2000/svg"  width="72" height="48" viewBox="0 0 576 512"> <path fill="cyan" d="M9.4 86.6C-3.1 74.1-3.1 53.9 9.4 41.4s32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 9.4 86.6zM256 416H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>

            {/* <!-- 5.Laptop --> */}
            <svg className="svg" xmlns="http://www.w3.org/2000/svg" width="72" height="48"  viewBox="0 0 640 512"> <path fill="cyan" d="M64 96c0-35.3 28.7-64 64-64H512c35.3 0 64 28.7 64 64V352H512V96H128V352H64V96zM0 403.2C0 392.6 8.6 384 19.2 384H620.8c10.6 0 19.2 8.6 19.2 19.2c0 42.4-34.4 76.8-76.8 76.8H76.8C34.4 480 0 445.6 0 403.2zM281 209l-31 31 31 31c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-48-48c-9.4-9.4-9.4-24.6 0-33.9l48-48c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM393 175l48 48c9.4 9.4 9.4 24.6 0 33.9l-48 48c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l31-31-31-31c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"/></svg>
        </div>

    </div>    
    );
};

export default Login;