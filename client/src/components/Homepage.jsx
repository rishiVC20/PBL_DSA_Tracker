import React from 'react'
import '../styles/Homepage.css';
import Navbar from './Navbar';
import array from '../images/array.png';
import list from '../images/linkedlist.png';
import stack from '../images/stack.png';
import queue from '../images/queue.png';
import trees from '../images/trees.png';
import graph from '../images/graph.png';
import searching from '../images/searching.png';
import sorting from '../images/sorting.png';
import string from '../images/string.png';
import recursion from '../images/recursion.png';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import sideImg from '../images/Landing_sideimg.png';


function Homepage(props) {
    const urltoAr = '/dsatracker/quiz/array/'+ props.username;
    const urltoLL = '/dsatracker/quiz/linkedlist/'+ props.username;
    const urltoSk = '/dsatracker/quiz/stack/'+ props.username;
    const urltoQu = '/dsatracker/quiz/queue/'+ props.username;
    const urltoTr = '/dsatracker/quiz/trees/'+ props.username;
    const urltoGr = '/dsatracker/quiz/graph/'+ props.username;
    const urltoSc = '/dsatracker/quiz/searching/'+ props.username;
    const urltoSt = '/dsatracker/quiz/sorting/'+ props.username;
    const urltoSr = '/dsatracker/quiz/strings/'+ props.username;
    const urltoRc = '/dsatracker/quiz/recursion/'+ props.username;

    return (
        <div className='parentHome'>
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css2?family=Foldit:wght@100..900&display=swap" rel="stylesheet"/>
                <link rel="stylesheet" href="./style.css"/>
                <script src="https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js"></script>
            </Helmet>

            <Navbar username={props.username}/>

            <div className="container1H">
                <div className="headingH">
                    <div className="textH">
                        <h1 className='h1H'>Welcome to the <br/> world of DSA</h1>
                        <p style={{color: "white", marginTop: "5%", fontSize: "large"}}>Practice DSA problems and boost your DSA skills with DSA Tracker<br/>Practice | Score | Succeed</p>
                        <p style={{fontSize: "24px", color: "white", marginTop: "5%"}}>Let's Track It !</p>
                    </div>
                </div>
                <div className="sideimg">
                    <img className="LandingSideImg" src={sideImg} height={400} width={400} />
                </div>
            </div>

            <p className='headHome'>Select Topics</p>
            <div className='topicdiv'>

                <div className='topiccard'>
                    <img src={array} className='topicimage'/>
                    <div className='flexhead'>
                        <p className='topicname'>Array</p><p style={{color:'lime'}} className='tlevel'>Easy</p>
                    </div>
                    <p style={{marginLeft:'1vw', marginRight:'1vw', fontSize:'small', color:'lightgrey'}}>
                    An array data structure stores a collection of elements in a contiguous block of memory.
                    </p>
                    <Link to={urltoAr}>
                        <button className='startbtn'>Quiz</button>
                    </Link>
                    <Link to={`/dsatracker/questions/array/${props.username}`}>
                        <button className='startbtn'>Questions</button>
                    </Link>
                </div>

                <div className='topiccard'>
                    <img src={list} className='topicimage'/>
                    <div className='flexhead'>
                        <p className='topicname'>Linked List</p><p style={{color:'yellow'}} className='tlevel'>Medium</p>
                    </div>
                    <p style={{marginLeft:'1vw', marginRight:'1vw', fontSize:'small', color:'lightgrey'}}>
                    A linked list can store a collection of "nodes" connected together via links i.e. pointers.
                    </p>
                    <Link to={urltoLL}>
                        <button className='startbtn'>Quiz</button>
                    </Link>
                    <Link to={`/dsatracker/questions/linkedlist/${props.username}`}>
                        <button className='startbtn'>Questions</button>
                    </Link>
                </div>

                <div className='topiccard'>
                    <img src={stack} className='topicimage'/>
                    <div className='flexhead'>
                        <p className='topicname'>Stack</p><p style={{color:'yellow'}} className='tlevel'>Medium</p>
                    </div>
                    <p style={{marginLeft:'1vw', marginRight:'1vw', fontSize:'small', color:'lightgrey'}}>
                    A stack is a linear data structure that follows the LIFO (Last In First Out) principle.
                    </p>
                    <Link to={urltoSk}>
                        <button className='startbtn'>Quiz</button>
                    </Link>
                    <Link to={`/dsatracker/questions/stack/${props.username}`}>
                        <button className='startbtn'>Questions</button>
                    </Link>
                </div>

                <div className='topiccard'>
                    <img src={queue} className='topicimage'/>
                    <div className='flexhead'>
                        <p className='topicname'>Queue</p><p style={{color:'yellow'}} className='tlevel'>Medium</p>
                    </div>
                    <p style={{marginLeft:'1vw', marginRight:'1vw', fontSize:'small', color:'lightgrey'}}>
                    A Queue is a linear data structure that follows the FIFO (First In First Out) principle.
                    </p>
                    <Link to={urltoQu}>
                        <button className='startbtn'>Quiz</button>
                    </Link>
                    <Link to={`/dsatracker/questions/queue/${props.username}`}>
                        <button className='startbtn'>Questions</button>
                    </Link>
                </div>

                <div className='topiccard'>
                    <img src={trees} className='topicimage'/>
                    <div className='flexhead'>
                        <p className='topicname'>Trees</p><p style={{color:'red'}} className='tlevel'>Hard</p>
                    </div>
                    <p style={{marginLeft:'1vw', marginRight:'1vw', fontSize:'small', color:'lightgrey'}}>
                    Hierarchical structure that is used to represent data in a way that is easy to navigate and search.
                    </p>
                    <Link to={urltoTr}>
                        <button className='startbtn'>Quiz</button>
                    </Link>
                    <Link to={`/dsatracker/questions/trees/${props.username}`}>
                        <button className='startbtn'>Questions</button>
                    </Link>
                </div>

                <div className='topiccard'>
                    <img src={graph} className='topicimage'/>
                    <div className='flexhead'>
                        <p className='topicname'>Graph</p><p style={{color:'red'}} className='tlevel'>Hard</p>
                    </div>
                    <p style={{marginLeft:'1vw', marginRight:'1vw', fontSize:'small', color:'lightgrey'}}>
                    A Graph is a non-linear data structure that consists of vertices (nodes) and edges.
                    </p>
                    <Link to={urltoGr}>
                        <button className='startbtn'>Quiz</button>
                    </Link>
                    <Link to={`/dsatracker/questions/graph/${props.username}`}>
                        <button className='startbtn'>Questions</button>
                    </Link>
                </div>

                <div className='topiccard'>
                    <img src={searching} className='topicimage'/>
                    <div className='flexhead'>
                        <p className='topicname'>Searching</p><p style={{color:'lime'}} className='tlevel'>Easy</p>
                    </div>
                    <p style={{marginLeft:'1vw', marginRight:'1vw', fontSize:'small', color:'lightgrey'}}>
                    Searching refers to the process of locating the required element from a particular data structure.
                    </p>
                    <Link to={urltoSc}>
                        <button className='startbtn'>Quiz</button>
                    </Link>
                    <Link to={`/dsatracker/questions/searching/${props.username}`}>
                        <button className='startbtn'>Questions</button>
                    </Link>
                </div>

                <div className='topiccard'>
                    <img src={sorting} className='topicimage'/>
                    <div className='flexhead'>
                        <p className='topicname'>Sorting</p><p style={{color:'yellow'}} className='tlevel'>Medium</p>
                    </div>
                    <p style={{marginLeft:'1vw', marginRight:'1vw', fontSize:'small', color:'lightgrey'}}>
                    Sorting refers to arranging data in particular order, generally ascending or descending.
                    </p>
                    <Link to={urltoSt}>
                        <button className='startbtn'>Quiz</button>
                    </Link>
                    <Link to={`/dsatracker/questions/sorting/${props.username}`}>
                        <button className='startbtn'>Questions</button>
                    </Link>
                </div>

                <div className='topiccard'>
                    <img src={string} className='topicimage'/>
                    <div className='flexhead'>
                        <p className='topicname'>String</p><p style={{color:'lime'}} className='tlevel'>Easy</p>
                    </div>
                    <p style={{marginLeft:'1vw', marginRight:'1vw', fontSize:'small', color:'lightgrey'}}>
                    A String is a data type that stores sequence of characters. It class internally uses
                    character array.
                    </p>
                    <Link to={urltoSr}>
                        <button className='startbtn'>Quiz</button>
                    </Link>
                    <Link to={`/dsatracker/questions/strings/${props.username}`}>
                        <button className='startbtn'>Questions</button>
                    </Link>
                </div>

                <div className='topiccard'>
                    <img src={recursion} className='topicimage'/>
                    <div className='flexhead'>
                        <p className='topicname'>Recursion</p><p style={{color:'yellow'}} className='tlevel'>Medium</p>
                    </div>
                    <p style={{marginLeft:'1vw', marginRight:'1vw', fontSize:'small', color:'lightgrey'}}>
                    The process in which a function calls itself directly or indirectly is called Recursion. 
                    </p>
                    <Link to={urltoRc}>
                        <button className='startbtn'>Quiz</button>
                    </Link>
                    <Link to={`/dsatracker/questions/recursion/${props.username}`}>
                        <button className='startbtn'>Questions</button>
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default Homepage;