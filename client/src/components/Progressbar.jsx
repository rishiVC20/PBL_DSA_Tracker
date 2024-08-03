import React from 'react';
import '../styles/Progressbar.css';

function Progressbar({ percentage }){
    return (
        <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${percentage}%` }}>{percentage}%</div>
        </div>
    );
};

export default Progressbar;