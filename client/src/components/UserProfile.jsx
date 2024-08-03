import React, { useEffect, useState } from 'react';
import '../styles/UserProfile.css';
import Navbar from './Navbar';
import userimg from '../images/programmer3.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import editicon from '../images/edit.png';
import Popup from 'reactjs-popup';
import Progressbar from './Progressbar';


function UserProfile(props) {
    const [username, setUsername] = useState(props.username);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [age, setAge] = useState(0);
    const [badge, setBadge] = useState('');
    const [regon, setRegon] = useState('');
    const [pro1, setPro1] = useState(0);
    const [pro2, setPro2] = useState(0);
    const [pro3, setPro3] = useState(0);
    const [pro4, setPro4] = useState(0);
    const [pro5, setPro5] = useState(0);
    const [pro6, setPro6] = useState(0);
    const [pro7, setPro7] = useState(0);
    const [pro8, setPro8] = useState(0);
    const [pro9, setPro9] = useState(0);
    const [pro10, setPro10] = useState(0);

    useEffect(()=>{
        fetchUserData();
    }, []);

    const arrsum = (arr) => {
        let sum = 0;
        arr.forEach(element => {
            sum += element;
        });
        return sum;
    }

    const fetchUserData = async () => {
        try {
            const usnm = {username : ""};
            usnm.username = username;
            axios.post(`http://localhost:3001/dsatracker/userprofile/${username}`, usnm)
            .then(async (res) => {
                const userdata = await res.data;
                setName(userdata.name);
                setAge(userdata.age);
                setEmail(userdata.email);
                setRole(userdata.role);
                setBadge(userdata.badge);
                setRegon(userdata.registeredOn);
                setPro1(arrsum(userdata.progress1)+userdata.score1);
                setPro2(arrsum(userdata.progress2)+userdata.score2);
                setPro3(arrsum(userdata.progress3)+userdata.score3);
                setPro4(arrsum(userdata.progress4)+userdata.score4);
                setPro5(arrsum(userdata.progress5)+userdata.score5);
                setPro6(arrsum(userdata.progress6)+userdata.score6);
                setPro7(arrsum(userdata.progress7)+userdata.score7);
                setPro8(arrsum(userdata.progress8)+userdata.score8);
                setPro9(arrsum(userdata.progress9)+userdata.score9);
                setPro10(arrsum(userdata.progress10)+userdata.score10);
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };


    const setNewName = async (req, res) => {
        try{
            axios.post(`http://localhost:3001/dsatracker/setnewname/${username}/${name}/${age}/${role}`)
            .then(res => {
                alert(res.data.message);
            })
            .catch(error => {
                alert(res.data.message, error);
            })
        }
        catch(error){
            console.error('Error setting name:', error);
        }
    }

    const handleChange = (e) => {
        setName(e.target.value);
    }

    const handleAgeChange = (e) => {
        setAge(e.target.value);
    }

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    }

    return (
        <div className='parentUP'>
            <Navbar/>

            <div className='profilediv'>

                <div className='profiledivleft'>
                    <div className='userimgdiv'>
                        <img src={userimg} className='userimg'/>
                    </div>
                    <p className='usn'>
                        {username}
                        <Popup trigger={<button className='editbtn' onClick=''><img src={editicon} className='editicon'/></button>} position='bottom center'>
                            <div className='popupP'>
                                <p>Enter name :</p>
                                <input type='text' onChange={handleChange} className='inputboxP' name='name' value={name}/>
                                <p>Enter Age :</p>
                                <input type='Number' onChange={handleAgeChange} className='inputboxP' name='age' value={age}/>
                                <p>Select Role :</p>
                                <select className='inputboxP' name='role' value={role} onChange={handleRoleChange}>
                                    <option value='Student'>Student</option>
                                    <option value='Professional'>Professional</option>
                                    <option value='Other'>Other</option>
                                </select>
                                <button className='savebtn' onClick={setNewName}>Save</button>
                            </div>
                        </Popup>
                    </p>
                    <Link to='/dsatracker'>
                        <button className='logoutbtn'>Logout</button>
                    </Link>
                </div>

                <div className='profiledivright'>
                    <p className='userdetails'>
                        <h4 className='userinfoval'>Name : {name} </h4><br/>
                        <h4 className='userinfoval'>Role : {role} </h4><br/>
                        <h4 className='userinfoval'>Email : {email} </h4><br/>
                        <h4 className='userinfoval'>Badge : {badge} </h4><br/>
                        <h4 className='userinfoval'>Age : {age} </h4><br/>
                        <h4 className='userinfoval'>Registered on : {regon} </h4> 
                    </p>
                </div>
                
                <div className='progressDivL'>
                    <p style={{margin:'5px', fontWeight:'500'}}>Current Progress</p>
                    <p style={{marginLeft:'5px'}}>Array</p>
                    <Progressbar percentage={pro1}/>
                    <p style={{marginLeft:'5px'}}>Linked List</p>
                    <Progressbar percentage={pro2}/>
                    <p style={{marginLeft:'5px'}}>Stack</p>
                    <Progressbar percentage={pro3}/>
                    <p style={{marginLeft:'5px'}}>Queue</p>
                    <Progressbar percentage={pro4}/>
                    <p style={{marginLeft:'5px'}}>Trees</p>
                    <Progressbar percentage={pro5}/>
                </div>
            
                <div className='progressDivR'>
                    <p style={{marginLeft:'5px'}}>Graph</p>
                    <Progressbar percentage={pro6}/>
                    <p style={{marginLeft:'5px'}}>Searching</p>
                    <Progressbar percentage={pro7}/>
                    <p style={{marginLeft:'5px'}}>Sorting</p>
                    <Progressbar percentage={pro8}/>
                    <p style={{marginLeft:'5px'}}>Strings</p>
                    <Progressbar percentage={pro9}/>
                    <p style={{marginLeft:'5px'}}>Recursion</p>
                    <Progressbar percentage={pro10}/>
                </div>

            </div>
        
        </div>
    );
}

export default UserProfile;