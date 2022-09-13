const router = require('express').Router();

const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        res.render('homepage');
    }   
    catch (err) {
        res.status(500).json(err);
    };
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
    } else {
        res.render('login');
    };
});

router.get('/register', (req, res) => {
    res.render('register');
});

module.exports = router;