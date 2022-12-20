import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import {databaseConnect} from './database/mongoConnect.js';
import router from './routes/index.js';
import cors from 'cors';
import { PORT } from './config/config.js';

const whitelist = ['http://localhost:5173', 'http://192.168.0.135:5173']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
const port = PORT || 5000;
databaseConnect();
console.log("connected to mongo successfully");

const app = express();

app.use(morgan('combined'));
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use('/api/v1',router);




app.get("/", (req, res) => {
  res.send("hello");
});
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
