     const express = require('express');
     const jwt = require('jsonwebtoken');
     const User = require('../models/User');

     const router = express.Router();

     router.post('/login', async (req, res) => {
       const { username, password } = req.body;
       const user = await User.findOne({ username });
       if (!user || !(await user.comparePassword(password))) {
         return res.status(401).send('Authentication failed');
       }

       const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
       res.send({ token });
     });

     module.exports = router;
    