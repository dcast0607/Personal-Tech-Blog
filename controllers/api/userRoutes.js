const express = require('express');
const router = express.Router();
const path = require('path');
const withAuth = require('../../utils/auth');
const bcrypt = require('bcrypt');

const { User } = require('../../models');
const { equal } = require('assert');

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
        const existingUser = await User.findOne({
            where: {
                username: req.body.username,
            },
        })
        if (existingUser) {
            res.status(400).json("User already exists please try again!");
        } else {
            console.log(req.body);
            const newUser = await User.create(req.body);

            req.session.user_id = newUser.id;
            req.session.logged_in = true;

            res.status(200).json(newUser);
        };
    }
    catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        console.log(req.body);
        const existingUser = await User.findOne({
            where: {
                username: req.body.username,
            }
        })
        .then((existingUser) => {
            //console.log(existingUser);
            if (existingUser) {
                const passwordValidator = existingUser.checkUserPassword(req.body.password);
                if (passwordValidator) {

                    req.session.save(() => {
                        req.session.user_id = existingUser.id;
                        req.session.logged_in = true;
                        res.status(200).json("User logged in successfully.");
                    });

                } else {
                    res.status(400).json("Password does not match, please try again.");
                }

            } else {
                res.status(400).json("We could not find the user, please make sure that you are attempting to login as an existing user.");
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }
    catch (err) {
        res.status(400).json(err);
    };
});

router.post('/logout', async (req, res) => {
    try {
        if(req.session.logged_in) {
            req.session.destroy(() => {
                res.status(201).json("User session has been terminated!").end();
            });
        } else {
            res.status((400).json("No existing sign in session!").end());
        }
    } 
    catch (err) {
        res.status(404).json(err);
    };
});


module.exports = router;
