const express = require('express');
const router = express.Router();
const path = require('path');
const withAuth = require('../../utils/auth');
const bcrypt = require('bcrypt');

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


router.post('/', async (req, res) => {
    try {

    }
    catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {

    }
    catch (err) {
        res.status(400).json(err);
    };
});

router.post('/logout', async (req, res) => {
    try {
        
    } 
    catch (err) {
        res.status(404).json(err);
    };
});


module.exports = router;
