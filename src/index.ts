import express from 'express';
import routes from './routes';

const dotenv = require('dotenv');
dotenv.config();

const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
    console.log(`⚡️ Server is running at https://localhost:${PORT}`);
});
