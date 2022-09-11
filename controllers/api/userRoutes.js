// We bring in the necessary package and dependencies.

const express = require('express');
const router = express.Router();
// const path = require('path');
// const withAuth = require('../../utils/auth');
const bcrypt = require('bcrypt');

// We bring in the user model since this is what we will be interacting with. 
const { User } = require('../../models');

// In a previous project I ran into a ton of CORS issues, the recommendation
// was to include this to clear up any CORS issues. This is why I have added that
// here.
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

// This POST route allows a user to create a new user. 
// We are doing a few things with this route. The first thing we check for
// is to see if we already have an existing user in the database with the same
// username, we don't want multiple users with the same username as it will 
// be problematic for us. 

// The next thing we do is if there is already an existing user, we issue an 
// error message, if there is not an existing user, we proceed with creating that
// user. 

// Once the user has been created we also make sure to initialize a sign in session
// for the user. 
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

// This log in route allows us to authenticate the user via the credentials that
// are passed as part of the request body. In this case, we first check to see
// if the user reference in the username body parameter matches an existing user
// in the database, if it does not we issue an error. 

// If a user does exist, we then validate the users password through the use of
// a function that we declared as part of our user model. This validates to make
// sure that the password sent matches up with the hashed password in our database.

// If the password is valid, we authenticate the user and initiate or update a sign in
// session. If the password is not valid, we do not authenticate the user and we return
// an error as part of our API response.
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

// The logout route, will identify an existing sign in session and destroy the sign
// in session, this effectively logs out the user.
router.post('/logout', async (req, res) => {
    try {
        if(req.session.logged_in) {
            req.session.destroy(() => {
                res.status(201).json("User session has been terminated!").end();
            });
        } else {
            res.status((400).json("No existing sign in session!").end());
        };
    } 
    catch (err) {
        res.status(404).json(err);
    };
});


module.exports = router;

// I looked through my previous projects to work out the logic
// that would be needed here. Also relied heavily on the instructor
// material to figure this out. 