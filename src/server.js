import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import passport from 'passport';
import '@babel/polyfill/noConflict';
import user from './routes/user';
import bus from './routes/bus';
import trip from './routes/trip';
import booking from './routes/booking';
const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use(morgan('dev'));
app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use('/api/v1/auth', user);
app.use('/api/v1', bus);
app.use('/api/v1', trip);
app.use('/api/v1', booking);

const PORT = process.env.PORT || 5555;

app.listen(PORT, () => {
  console.log(`Server Started at Port : ${PORT}`);
});
