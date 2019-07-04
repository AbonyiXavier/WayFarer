import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import '@babel/polyfill/noConflict';
import user from './routes/user';
const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use(morgan('dev'));
app.use('/api/v1/auth', user);

const PORT = process.env.PORT || 5555;

app.listen(PORT, () => {
  console.log(`Server Started at Port : ${PORT}`);
});
