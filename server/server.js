const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
import cookieParser from 'cookie-parser';
import session from 'express-session';
const app = express();

const PORT = process.env.PORT || 5000;

const auth = require('./routes/auth');
const user = require('./routes/user');

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
app.use('/api/user', user);

app.listen(PORT, () => {
  console.log(`HELLO FROM THE SERVER!!RUNNING ON PORT ${PORT}`);
});
