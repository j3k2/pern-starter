const express = require('express');
const app = express();
const cors = require('cors');

const authRoutes = require('./routes/auth');

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);

app.listen(5000);