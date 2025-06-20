require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const restakerRoutes = require('./routes/restakers');
const validatorRoutes = require('./routes/validators');
const rewardRoutes = require('./routes/rewards');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB Not connected:', err));


app.use('/restakers', restakerRoutes);
app.use('/validators', validatorRoutes);
app.use('/rewards', rewardRoutes);


app.get('/', (req, res) => res.send('EigenLayer Restaking API Running'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
