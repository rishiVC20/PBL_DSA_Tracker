import React from 'react';
import '../styles/PQlist.css';
import { Link } from 'react-router-dom';

function PQlistLL(props){    
    return(
        <div className='parentPQ'>
            <div className='PQlistdiv'>
                <h2>Programming Questions</h2><br/>

                <Link to={`http://localhost:8000/1-${props.username}`}>
                <button className='quebtn'>Que 1</button>
                </Link>
                <span className='status'></span><br/>

                <Link to={`http://localhost:8000/2-${props.username}`}>
                <button className='quebtn'>Que 2</button>
                </Link>
                <span className='status'></span><br/>

                <Link to={`http://localhost:8000/3-${props.username}`}>
                <button className='quebtn'>Que 3</button>
                </Link>
                <span className='status'></span><br/>

                <Link to={`http://localhost:8000/4-${props.username}`}>
                <button className='quebtn'>Que 4</button>
                </Link>
                <span className='status'></span><br/>

                <Link to={`http://localhost:8000/5-${props.username}`}>
                <button className='quebtn'>Que 5</button>
                </Link>
                <span className='status'></span><br/>

                <Link to={`http://localhost:8000/6-${props.username}`}>
                <button className='quebtn'>Que 6</button>
                </Link>
                <span className='status'></span>
            </div>
        </div>
    );
}

export default PQlistLL;