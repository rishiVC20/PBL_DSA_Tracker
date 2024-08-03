import React, { useState, useEffect } from 'react';
import '../styles/Quiz.css';
import recursion from '../images/recursion.png'
import axios from 'axios';

const QuizRc = (props) => {
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(0);
    const [bestscore, setBestScore] = useState(0);
    var username;

    useEffect(() => {
        username = props.username;
        fetchQuestions();
        fetchBestScore();
    }, []);
    
    const fetchQuestions = async () => {
        try {
            const response = await fetch(`http://localhost:3001/dsatracker/quiz/recursion/${username}`);
            const data = await response.json();
            setQuestions(data);
        } 
        catch (error) {
            console.error('Error fetching questions :', error);
        }
    };

    const fetchBestScore = async () => {
        try{
            const rsp = await fetch(`http://localhost:3001/dsatracker/quizscore/recursion/${username}`);
            const bs = await rsp.json();
            setBestScore(bs); 
        }
        catch (error){
            console.error('Error fetching the best score :', error);
        }
    };

    const handleAnswerSelection = (questionIndex, selectedOption) => {
        setUserAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionIndex]: selectedOption,
        }));
    };

    const handleSubmitQuiz = async () => {
        let totalScore = 0;
        questions.forEach((question, index) => {
            if (question.correctAnswer === userAnswers[index]) {
                totalScore += question.points;
            }
        });

        setScore(totalScore);
    };

    useEffect(() => {
        if (score > bestscore) {
            setBestScore(score);
        }
    }, [score]);
    
    useEffect(() => {
        const sendBestScoreToBackend = async () => {
            try {
                await axios.post(`http://localhost:3001/dsatracker/setbestscore/recursion/${props.username}`, { bestscore });
                // Optionally, update local UI or show success message here
            } catch (error) {
                console.error('Error setting the best score :', error);
            }
        };
    
        // Call the function to send the best score to the backend
        if (bestscore > 0) { // Ensure bestscore is greater than zero before sending to backend
            sendBestScoreToBackend();
        }
    }, [bestscore]);

    const handleClearAll = () => {
        setUserAnswers({}); // Clear selected options
        const radioButtons = document.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(button => {
            button.checked = false; // Uncheck all radio buttons
        });
    };

    return (
        <div className='gridbox'>
            <div className='leftdiv'>
                <div className='infodiv'>
                    <img src={recursion} className='headimage'/>
                    <p className='topic'>Topic : Recursion<br/>Score: {score}<br/>Best Score : {bestscore}</p><br/>
                    <button className='clearchoicebtn' onClick={handleClearAll}>Clear All</button>
                    <button className='submitbtn' onClick={handleSubmitQuiz}>Submit Quiz</button><br/>
                    <p className='quizinfo'>The quiz is of total 40 points. Numbers in the [] bracket after the 
                    question indicate full points. For every correct answer, full 
                    points will be awarded whereas 0 points will be given for each wrong answer.</p>
                </div>
            </div>
            <div className='parentQz'>
                <div className='quizdiv'>
                    <h1 className='quizheading'>Quiz</h1>
                    {questions.map((question, index) => (
                        <div key={index}>
                            <p className='que'>{index+1}. {question.question} <p className='points'>[{question.points}]</p></p>
                            <ul className='optionlist'>
                                {question.options.map((option, idx) => (
                                    <li key={idx}>
                                        <p>
                                            <label>
                                                <input
                                                    className='inputradio'
                                                    type="radio"
                                                    name={`question-${index}`}
                                                    value={option}
                                                    id={`${index}-${idx}`}
                                                    onChange={() => handleAnswerSelection(index, option)}
                                                />
                                                <label className='optionclass' for={`${index}-${idx}`}>{option}</label>
                                            </label>
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuizRc;