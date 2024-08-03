//import statements
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const http = require('http');
const bcrypt = require('bcryptjs');

//middlewares
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors({origin : true}));

//transporter for node mailer
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    secure : false,
    auth: {
        user: 'pblgroupsem4@gmail.com',
        pass: 'tzjb vune jful noks'
    }
});

/*----------------------------------------------Database Schemas---------------------------------------------*/

//user database schema 
const userSchema = new mongoose.Schema({
    username : String,
    email : String,
    password : String,
    name : {type : String,  default : 'Name'},
    role : {type : String, default : 'Student'},
    badge : {type : String, default : 'Newbie'},
    age : {type : String, default : 18},
    registeredOn : String,
    resetPasswordToken : {type : String,  default : ''},
    score1 : {type : Number, default : 0},
    score2 : {type : Number, default : 0},
    score3 : {type : Number, default : 0},
    score4 : {type : Number, default : 0},
    score5 : {type : Number, default : 0},
    score6 : {type : Number, default : 0},
    score7 : {type : Number, default : 0},
    score8 : {type : Number, default : 0},
    score9 : {type : Number, default : 0},
    score10 : {type : Number, default : 0},
    progress1 : {type : [Number], default : [0, 0, 0, 0, 0, 0]},
    progress2 : {type : [Number], default : [0, 0, 0, 0, 0, 0]},
    progress3 : {type : [Number], default : [0, 0, 0, 0, 0, 0]},
    progress4 : {type : [Number], default : [0, 0, 0, 0, 0, 0]},
    progress5 : {type : [Number], default : [0, 0, 0, 0, 0, 0]},
    progress6 : {type : [Number], default : [0, 0, 0, 0, 0, 0]},
    progress7 : {type : [Number], default : [0, 0, 0, 0, 0, 0]},
    progress8 : {type : [Number], default : [0, 0, 0, 0, 0, 0]},
    progress9 : {type : [Number], default : [0, 0, 0, 0, 0, 0]},
    progress10 : {type : [Number], default : [0, 0, 0, 0, 0, 0]}
});

//question database schema
const questionSchema = new mongoose.Schema({
    question : String,
    options : [String],
    correctAnswer: String,
    points : Number
  }, {collection : 'linkedlist' }
);

/*--------------------------------------------Database Connections-------------------------------------------*/

//create connection to quiz database
var quizConnection = mongoose.createConnection('mongodb://localhost:27017/dsatracker');
quizConnection.once('open', () => {console.log("Connected to Quiz Database")});
quizConnection.on('error', () => {console.log("Error connecting to Quiz Database !")});

//create connection to user database
var userConnection = mongoose.createConnection('mongodb://localhost:27017/userDB');
userConnection.once('open', () => {console.log("Connected to User Database")});
userConnection.on('error', () => {console.log("Error connecting to User Database !")})


/*-----------------------------------------------Functions---------------------------------------------------*/

function generateVerificationCode(length) {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

/*----------------------------------------------Database Models----------------------------------------------*/

//for question set : array 
// const arrayQue = mongoose.model('arrays', questionSchema);

//for question set : linked list
const linkedListQue = quizConnection.model('linkedlist', questionSchema);

//for question set : stack
// const stackQue = mongoose.model('stack', questionSchema);

//for question set : queue
// const queueQue = mongoose.model('queue', questionSchema);

//for question set : trees
// const treesQue = mongoose.model('trees', questionSchema);

//for question set : graph
// const graphQue = mongoose.model('graphs', questionSchema);

//for question set : strings
// const stringQue = mongoose.model('string', questionSchema);

//for question set : recursion
// const recursionQue = mongoose.model('recursion', questionSchema);

//for question set : searching
// const searchingQue = mongoose.model('searching', questionSchema);

//for question set : sorting
// const sortingQue = mongoose.model('sorting', questionSchema);

//for user
const User = userConnection.model("users", userSchema);

/*------------------------------------------------API Endpoints----------------------------------------------*/

//for login
app.post('/dsatracker/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.send({ message: "User doesn't exist" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch){
            res.send({ message: "Login successful", redirect : "/" });
        } 
        else{
            res.send({ message: "Invalid password" });
        }
    } 
    catch (err) {
        console.error("Error logging in user:", err);
        res.status(500).send({ message: "Error logging in user" });
    }
});

//for signup
app.post('/dsatracker/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.send({ message: "User already exists" });
        }
        var nowDate = new Date(); 
        var registeredOn = nowDate.getDate()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getFullYear();
        const hashedpassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password : hashedpassword,
            registeredOn
        });
        await newUser.save();
        res.send({message : 'User Registered Successfully'});
    } catch (err) {
        console.error("Error signing up user:", err);
        res.status(500).send({ message: "Error registering user" });
    }
});

//for forgot password
app.post('/dsatracker/login/forgotpassword', async (req, res) => {
    const {username} = req.body;
    console.log({username});
    try{
        const u1 = await User.findOne({username});
        if(u1){
            const token = generateVerificationCode(6);
            u1.resetPasswordToken = token;
            await u1.save();
            const mailid = u1.email;
            try {
                // Send email
                const info = await transporter.sendMail({
                    from: 'pblgroupsem4@gmail.com',
                    to: mailid,
                    subject: 'DSA Tracker Password Reset', 
                    text: `
Dear user,
    A password reset request for your DSA Tracker account has been initiated. Use this code to reset your DSA Tracker password.  
This is a one time verification code. It won't work when you try to reset your password next time.
Verification code : ${token}

Happy coding

Team,
DSA Tracker
`
                });
                console.log('Email sent: ', info.response);
                res.send({message : "One time verification code has been sent to your registered email id"})
            } 
            catch (error) {
                console.error('Error sending email: ', error);
            }
        }
        else{
            return res.send({ message : "User not found" });
        }
    }
    catch(error){
        console.error('An error occurred: ', error);
    }
});


//API to reset password
app.post('/dsatracker/login/resetpassword', async (req, res) => {
    try{
        const {username, token, newpassword} = req.body;
        const user = await User.findOne({username});
        if(user){
            if(token === user.resetPasswordToken){
                const hashedpassword = await bcrypt.hash(newpassword, 10);
                user.password = hashedpassword;
                user.resetPasswordToken = '';
                await user.save();
                res.send({message: 'Password reset successful'});
            }
            else{
                res.send({message : 'Verification code invalid'});
            }
        }
        else{
            res.send({message : 'User not found'});
        }
    }
    catch(error){
        res.send({message : 'Failed to reset password'});
    }
});


// for getting data of specific user on profile page
app.post('/dsatracker/userprofile/:username', async (req, res) => {  
    try {
        const {username} = req.body;
        const userinfo = await User.findOne({username});
        if(userinfo){
            res.json(userinfo);
        }
        else{
            res.send({message : 'User data error'});
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

//---Quiz fetching apis----------------------------//

//api for fetching the best score of a topic
app.get('/dsatracker/quizscore/:topic/:username', async (req, res) =>{
    const topicname = req.params.topic;
    const username = req.params.username;
    var bsc;
    //fetch this users' scores of quiz
    try{
        const userinfo = await User.findOne({username});
        if(userinfo){
            switch(topicname)
            {
                case 'array':
                    bsc = userinfo.score1;
                    break;
                case 'linkedlist':
                    bsc = userinfo.score2;
                    break;
                case 'stack':
                    bsc = userinfo.score3;
                    break;
                case 'queue':
                    bsc = userinfo.score4;
                    break;
                case 'trees':
                    bsc = userinfo.score5;
                    break;
                case 'graph':
                    bsc = userinfo.score6;
                    break;
                case 'searching':
                    bsc = userinfo.score7;
                    break;
                case 'sorting':
                    bsc = userinfo.score8;
                    break;
                case 'strings':
                    bsc = userinfo.score9;
                    break;
                case 'recursion':
                    bsc = userinfo.score10;
                    break;                                    
            }
            res.json(bsc);
        }
        else{
            res.send({message : "Error fetching scores"});
        }
    }
    catch(error){
        console.error(error);
        res.send({message : "Error fetching scores"});
    }
});

//Api for setting the best score
app.post('/dsatracker/setbestscore/:topic/:username', async (req, res) =>{
    const topicname = req.params.topic;
    const username = req.params.username;
    var score = req.body.bestscore;
    console.log(score);
    try{
        const userinfo = await User.findOne({username});
        // console.log(userinfo._id);
        if(userinfo){
            switch(topicname)
            {
                case 'array':
                    User.findByIdAndUpdate(userinfo._id, { $set : {score1 :score}}, {new : true})
                    .then(updatedUser => {
                        console.log(updatedUser);
                    })
                    .catch(error => {
                        console.log(error);
                    });
                    break;
                case 'linkedlist':
                    User.findByIdAndUpdate(userinfo._id, { $set : {score2 :score}}, {new : true})
                    .then(updatedUser => {
                        console.log(updatedUser);
                    })
                    .catch(error => {
                        console.log(error);
                    });
                    break;
                case 'stack':
                    User.findByIdAndUpdate(userinfo._id, { $set : {score3 :score}}, {new : true})
                    .then(updatedUser => {
                        console.log(updatedUser);
                    })
                    .catch(error => {
                        console.log(error);
                    });
                    break;
                case 'queue':
                    User.findByIdAndUpdate(userinfo._id, { $set : {score4 :score}}, {new : true})
                    .then(updatedUser => {
                        console.log(updatedUser);
                    })
                    .catch(error => {
                        console.log(error);
                    });
                    break;
                case 'trees':
                    User.findByIdAndUpdate(userinfo._id, { $set : {score5 :score}}, {new : true})
                    .then(updatedUser => {
                        console.log(updatedUser);
                    })
                    .catch(error => {
                        console.log(error);
                    });
                    break;
                case 'graph':
                    User.findByIdAndUpdate(userinfo._id, { $set : {score6 :score}}, {new : true})
                    .then(updatedUser => {
                        console.log(updatedUser);
                    })
                    .catch(error => {
                        console.log(error);
                    });
                    break;
                case 'searching':
                    User.findByIdAndUpdate(userinfo._id, { $set : {score7 :score}}, {new : true})
                    .then(updatedUser => {
                        console.log(updatedUser);
                    })
                    .catch(error => {
                        console.log(error);
                    });
                    break;
                case 'sorting':
                    User.findByIdAndUpdate(userinfo._id, { $set : {score8 :score}}, {new : true})
                    .then(updatedUser => {
                        console.log(updatedUser);
                    })
                    .catch(error => {
                        console.log(error);
                    });
                    break;
                case 'strings':
                    User.findByIdAndUpdate(userinfo._id, { $set : {score9 :score}}, {new : true})
                    .then(updatedUser => {
                        console.log(updatedUser);
                    })
                    .catch(error => {
                        console.log(error);
                    });
                    break;
                case 'recursion':
                    User.findByIdAndUpdate(userinfo._id, { $set : {score10 :score}}, {new : true})
                    .then(updatedUser => {
                        console.log(updatedUser);
                    })
                    .catch(error => {
                        console.log(error);
                    });
                    break;                                    
            }
            res.send({message : `Best Score for this quiz is ${score}`});
        }
        else{
            res.send({message : "Error finding user"});
        }
    }
    catch(error){
        console.error(error);
        res.send({message : "Error Setting scores"});
    }
});


// for quiz of array
// app.get('/dsatracker/quiz/array/:username', async (req, res) => {  
//     try {
//       // Fetch 10 random questions from the database and store in arrrays (3 easy, 4 medium, 3 hard)
//       const easyQue = await arrayQue.aggregate([ { $match: { points: 2 } },{ $sample: { size: 3} }]);
//       const mediumQue = await arrayQue.aggregate([ { $match: { points: 4 } },{ $sample: { size: 4}}]);
//       const hardQue = await arrayQue.aggregate([ { $match: { points:6 } },{ $sample: { size: 3}}]);
  
//       //merge all three arrays into one and send as response to client side
//       const questions = [...easyQue, ...mediumQue, ...hardQue];
      
//       res.json(questions);
//     } 
//     catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server Error' });
//     }
// });

// for quiz of linked list
app.get('/dsatracker/quiz/linkedlist/:username', async (req, res) => {  
    try {
      // Fetch 10 random questions from the database and store in arrrays (3 easy, 4 medium, 3 hard)
      const easyQue = await linkedListQue.aggregate([ { $match: { points: 2 } },{ $sample: { size: 3} }]);
      const mediumQue = await linkedListQue.aggregate([ { $match: { points: 4 } },{ $sample: { size: 4}}]);
      const hardQue = await linkedListQue.aggregate([ { $match: { points:6 } },{ $sample: { size: 3}}]);
  
      //merge all three arrays into one and send as response to client side
      const questions = [...easyQue, ...mediumQue, ...hardQue];

      res.json(questions);
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
});

// for quiz of stack
// app.get('/dsatracker/quiz/stack/:username', async (req, res) => {  
//     try {
//       // Fetch 10 random questions from the database and store in arrrays (3 easy, 4 medium, 3 hard)
//       const easyQue = await stackQue.aggregate([ { $match: { points: 2 } },{ $sample: { size: 3} }]);
//       const mediumQue = await stackQue.aggregate([ { $match: { points: 4 } },{ $sample: { size: 4}}]);
//       const hardQue = await stackQue.aggregate([ { $match: { points:6 } },{ $sample: { size: 3}}]);
  
//       //merge all three arrays into one and send as response to client side
//       const questions = [...easyQue, ...mediumQue, ...hardQue];
      
//       res.json(questions);
//     } 
//     catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server Error' });
//     }
// });

// for quiz of queue
// app.get('/dsatracker/quiz/queue/:username', async (req, res) => {  
//     try {
//       // Fetch 10 random questions from the database and store in arrrays (3 easy, 4 medium, 3 hard)
//       const easyQue = await queueQue.aggregate([ { $match: { points: 2 } },{ $sample: { size: 3} }]);
//       const mediumQue = await queueQue.aggregate([ { $match: { points: 4 } },{ $sample: { size: 4}}]);
//       const hardQue = await queueQue.aggregate([ { $match: { points:6 } },{ $sample: { size: 3}}]);
  
//       //merge all three arrays into one and send as response to client side
//       const questions = [...easyQue, ...mediumQue, ...hardQue];

//       res.json(questions);
//     } 
//     catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server Error' });
//     }
// });

// for quiz of trees
// app.get('/dsatracker/quiz/trees/:username', async (req, res) => {  
//     try {
//       // Fetch 10 random questions from the database and store in arrrays (3 easy, 4 medium, 3 hard)
//       const easyQue = await treesQue.aggregate([ { $match: { points: 2 } },{ $sample: { size: 3} }]);
//       const mediumQue = await treesQue.aggregate([ { $match: { points: 4 } },{ $sample: { size: 4}}]);
//       const hardQue = await treesQue.aggregate([ { $match: { points:6 } },{ $sample: { size: 3}}]);
  
//       //merge all three arrays into one and send as response to client side
//       const questions = [...easyQue, ...mediumQue, ...hardQue];

//       res.json(questions);
//     } 
//     catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server Error' });
//     }
// });

// for quiz of graph
// app.get('/dsatracker/quiz/graph/:username', async (req, res) => {  
//     try {
//       // Fetch 10 random questions from the database and store in arrrays (3 easy, 4 medium, 3 hard)
//       const easyQue = await graphQue.aggregate([ { $match: { points: 2 } },{ $sample: { size: 3} }]);
//       const mediumQue = await graphQue.aggregate([ { $match: { points: 4 } },{ $sample: { size: 4}}]);
//       const hardQue = await graphQue.aggregate([ { $match: { points:6 } },{ $sample: { size: 3}}]);
  
//       //merge all three arrays into one and send as response to client side
//       const questions = [...easyQue, ...mediumQue, ...hardQue];

//       res.json(questions);
//     } 
//     catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server Error' });
//     }
// });

// for quiz of searching
// app.get('/dsatracker/quiz/searching/:username', async (req, res) => {  
//     try {
//       // Fetch 10 random questions from the database and store in arrrays (3 easy, 4 medium, 3 hard)
//       const easyQue = await searchingQue.aggregate([ { $match: { points: 2 } },{ $sample: { size: 3} }]);
//       const mediumQue = await searchingQue.aggregate([ { $match: { points: 4 } },{ $sample: { size: 4}}]);
//       const hardQue = await searchingQue.aggregate([ { $match: { points:6 } },{ $sample: { size: 3}}]);
  
//       //merge all three arrays into one and send as response to client side
//       const questions = [...easyQue, ...mediumQue, ...hardQue];

//       res.json(questions);
//     } 
//     catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server Error' });
//     }
// });

// for quiz of sorting
// app.get('/dsatracker/quiz/sorting/:username', async (req, res) => {  
//     try {
//       // Fetch 10 random questions from the database and store in arrrays (3 easy, 4 medium, 3 hard)
//       const easyQue = await sortingQue.aggregate([ { $match: { points: 2 } },{ $sample: { size: 3} }]);
//       const mediumQue = await sortingQue.aggregate([ { $match: { points: 4 } },{ $sample: { size: 4}}]);
//       const hardQue = await sortingQue.aggregate([ { $match: { points:6 } },{ $sample: { size: 3}}]);
  
//       //merge all three arrays into one and send as response to client side
//       const questions = [...easyQue, ...mediumQue, ...hardQue];

//       res.json(questions);
//     } 
//     catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server Error' });
//     }
// });

// for quiz of strings
// app.get('/dsatracker/quiz/strings/:username', async (req, res) => {  
//     try {
//       // Fetch 10 random questions from the database and store in arrrays (3 easy, 4 medium, 3 hard)
//       const easyQue = await stringQue.aggregate([ { $match: { points: 2 } },{ $sample: { size: 3} }]);
//       const mediumQue = await stringQue.aggregate([ { $match: { points: 4 } },{ $sample: { size: 4}}]);
//       const hardQue = await stringQue.aggregate([ { $match: { points:6 } },{ $sample: { size: 3}}]);
  
//       //merge all three arrays into one and send as response to client side
//       const questions = [...easyQue, ...mediumQue, ...hardQue];

//       res.json(questions);
//     } 
//     catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server Error' });
//     }
// });

// for quiz of recursion
// app.get('/dsatracker/quiz/recursion/:username', async (req, res) => {  
//     try {
//       // Fetch 10 random questions from the database and store in arrrays (3 easy, 4 medium, 3 hard)
//       const easyQue = await recursionQue.aggregate([ { $match: { points: 2 } },{ $sample: { size: 3} }]);
//       const mediumQue = await recursionQue.aggregate([ { $match: { points: 4 } },{ $sample: { size: 4}}]);
//       const hardQue = await recursionQue.aggregate([ { $match: { points:6 } },{ $sample: { size: 3}}]);
  
//       //merge all three arrays into one and send as response to client side
//       const questions = [...easyQue, ...mediumQue, ...hardQue];

//       res.json(questions);
//     } 
//     catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server Error' });
//     }
// });


//API to set new name
app.post('/dsatracker/setnewname/:username/:name/:age/:role', async (req, res) => {
    const username = req.params.username;
    const name = req.params.name;
    const age = req.params.age;
    const role = req.params.role;
    try{
        const regUser = await User.findOne({username});
        if(regUser){
            User.findByIdAndUpdate(regUser._id, { $set : {name : name, age : age, role : role}}, {new : true})
                    .then(updatedUser => {
                        console.log(updatedUser);
                    })
                    .catch(error => {
                        res.send({message : `Error updating profile : ${error}`});
                    });
        }
        else{
            res.send({message : 'Error finding user'});
        }
    }
    catch(err){
        res.send({message : 'Error updating profile'});
    }
});


//API to get the status of programming questions for linked list
app.post('/questions/receiveData/:que/:username', async (req, res) => {
    const receivedData = req.body; // Data sent from HTML file
    const username = req.params.username;
    const queno = req.params.que;
    console.log(username);
    console.log(receivedData);
    
    try{
        const regUser = await User.findOne({username});
        if(regUser){
            User.findByIdAndUpdate(regUser._id, { $set: { [`progress2.${queno-1}`]: 10 } }, {new : true})
                    .then(updatedUser => {
                        console.log(updatedUser);
                    })
                    .catch(error => {
                        res.send({message : `Error updating progress : ${error}`});
                    });
        }
        else{
            res.send({message : 'User not found'});
        }
    }
    catch(err){
        res.send({message : 'Error updating progress'});
    }
    
    // Sending response back to HTML file
    res.send('Data received successfully!');
  });



/*-------------------------------------------Running the Server----------------------------------------------*/

const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});