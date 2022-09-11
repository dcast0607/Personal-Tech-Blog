const express = require('express');
const router = express.Router();
const path = require('path');

const { User } = require('../../models');

router.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept",
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, DELETE, PUT"
    );
    next();
  });

// router.get('/:id', async (req, res) => {
//     try {
//         const userData = await User.findOne(req.params.id);
//         res.status(200).json(userData);
//     }
//     catch (err) {
//         res.status(400).json(err);
//     }
// });
