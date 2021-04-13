const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
import cookieParser from 'cookie-parser';
import session from 'express-session';
const app = express();

const PORT = process.env.PORT || 5000;

const auth = require('./routes/auth');

import { JWT_SECRET } from './config/secrets';

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(
  session({
    secret: JWT_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

// Mount Routes
app.use('/api/auth', auth);

// // GET request to access data of all users!
// app.get('/api/get', (req, res) => {
//   const getData = 'SELECT * FROM user';
//   db.query(getData, (err, result) => {
//     res.send(result);
//   });
// });

// // POST request to create a new user and insert into database!
// app.post('/api/insert', (req, res) => {
//   {
//     const userName = req.body.userName;
//     const userAge = req.body.userAge;
//     const insertData = 'INSERT INTO user (name,AGE) values (?,?)';
//     db.query(insertData, [userName, userAge], (err, result) => {
//       console.log(result);
//     });
//   }
// });

// // DELETE request to delete a user from database!
// app.delete('/api/delete/:userName', (req, res) => {
//   const deleteName = req.params.userName;
//   const deleteQuery = 'DELETE FROM user WHERE name=?';
//   db.query(deleteQuery, deleteName, (err, result) => {
//     if (err) console.log(err);
//   });
// });

// // PUT(UPDATE) request to update user details!
// app.put('/api/update', (req, res) => {
//   const userName = req.body.userName;
//   const userAge = parseInt(req.body.userAge);
//   const updateQuery = 'UPDATE user SET age=? WHERE name=?';
//   db.query(updateQuery, [userAge, userName], (err, result) => {
//     if (err) console.log(err);
//   });
// });

app.listen(PORT, () => {
  console.log(`HELLO FROM THE SERVER!!RUNNING ON PORT ${PORT}`);
});
