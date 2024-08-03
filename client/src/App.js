import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route, useParams, useNavigate} from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import QuizAr from './components/QuizAr';
import QuizLL from './components/QuizLL';
import QuizSk from './components/QuizSk';
import QuizQu from './components/QuizQu';
import QuizTr from './components/QuizTr';
import QuizGr from './components/QuizGr';
import QuizSc from './components/QuizSc';
import QuizSt from './components/QuizSt';
import QuizSr from './components/QuizSr';
import QuizRc from './components/QuizRc';
import Homepage from './components/Homepage';
import UserProfile from './components/UserProfile';

import PQlistLL from './components/PQlistLL';
// import Test from './components/Test';


function App() {
  return (
      <BrowserRouter>
        <Routes>
          {/* <Route path='/dsatracker/test' element={<Test/>}></Route> */}
          <Route path='/dsatracker' element={<LandingPage/>}></Route>
          <Route path='/dsatracker/signup' element={<Signup/>}></Route>
          <Route path='/dsatracker/login' element={<Login/>}></Route>
          <Route path='/dsatracker/home/:username' element={<HomepagewithUser/>}></Route>
          <Route path='/dsatracker/quiz/array/:username' element={<QuizArwithUser/>}></Route>
          <Route path='/dsatracker/quiz/linkedlist/:username' element={<QuizLLwithUser/>}></Route>
          <Route path='/dsatracker/quiz/stack/:username' element={<QuizSkwithUser/>}></Route>
          <Route path='/dsatracker/quiz/queue/:username' element={<QuizQuwithUser/>}></Route>
          <Route path='/dsatracker/quiz/trees/:username' element={<QuizTrwithUser/>}></Route>
          <Route path='/dsatracker/quiz/graph/:username' element={<QuizGrwithUser/>}></Route>
          <Route path='/dsatracker/quiz/searching/:username' element={<QuizScwithUser/>}></Route>
          <Route path='/dsatracker/quiz/sorting/:username' element={<QuizStwithUser/>}></Route>
          <Route path='/dsatracker/quiz/strings/:username' element={<QuizSrwithUser/>}></Route>
          <Route path='/dsatracker/quiz/recursion/:username' element={<QuizRcwithUser/>}></Route>
          <Route path='/dsatracker/userprofile/:username' element={<UserProfilewithUser/>}></Route>
          <Route path='/dsatracker/questions/linkedlist/:username' element={<PQlistLLwithuser/>}></Route>
        </Routes>
      </BrowserRouter>
  ); 
}

const QuizArwithUser = () => {
  const { username } = useParams();
  return <QuizAr username={username}/>
};

const QuizLLwithUser = () => {
  const { username } = useParams();
  return <QuizLL username={username}/>
};

const QuizSkwithUser = () => {
  const { username } = useParams();
  return <QuizSk username={username}/>
};

const QuizQuwithUser = () => {
  const { username } = useParams();
  return <QuizQu username={username}/>
};

const QuizTrwithUser = () => {
  const { username } = useParams();
  return <QuizTr username={username}/>
};

const QuizGrwithUser = () => {
  const { username } = useParams();
  return <QuizGr username={username}/>
};

const QuizScwithUser = () => {
  const { username } = useParams();
  return <QuizSc username={username}/>
};

const QuizStwithUser = () => {
  const { username } = useParams();
  return <QuizSt username={username}/>
};

const QuizSrwithUser = () => {
  const { username } = useParams();
  return <QuizSr username={username}/>
};

const QuizRcwithUser = () => {
  const { username } = useParams();
  return <QuizRc username={username}/>
};

const HomepagewithUser = () => {
  const { username } = useParams();
  return <Homepage username={username} />;
};

const UserProfilewithUser = () => {
  const { username } = useParams();
  return <UserProfile username={username} />;
};

const PQlistLLwithuser = () => {
  const { username } = useParams();
  return <PQlistLL username={username} />;
};

export default App;