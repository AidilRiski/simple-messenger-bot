import express from 'express';
import routes from './routes';

const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = 3000;


// Dangerous but needed to use TLS IMAP.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
    console.log(`⚡️ Server is running at https://localhost:${PORT}`);
});
