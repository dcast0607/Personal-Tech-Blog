const express = require('express');
const router = express.Router();
const withAuth = require('../../utils/auth');
const bcrypt = require('bcrypt');



const { User, Post } = require('../../models');
const { DataTypes } = require('sequelize');

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

 router.get('/', async (req, res) => {
    try {
        const fetchAllPosts = await Post.findAll()
        .then((fetchAllPosts) => {
            res.status(200).json(fetchAllPosts);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
    }
    catch (err) {
        res.status(400).json(err);
    };
 });

 router.get('/:id', async (req, res) => {
     try {
         const postData = await Post.findOne(
            {
                where: {
                    id: req.params.id
                }
        })
        .then((postData) => {
            if (postData !== null) {
                res.status(200).json(postData);

            }  else {
                res.status(400).json("No post found with provided ID");
            }
        })
        .catch((err) => {
            res.status(400).json("Please make sure that you include an ID.");
        })
     }
     catch (err) {
         res.status(400).json(err);
     }
});


// TODO: Needs refactoring or can use array method to get data I need. 
// router.get('/:user_id', async (req, res) => {
//     try {
//         const allUserPosts = await Post.findAll(
//         {
//             where: where,
//             include: [
//                 {
//                     model: models.User,
//                     as: "user",
//                     where: {
//                         id: req.params.user_id,
//                     },
//                 },
//             ],
//         })
//         .then((allUserPosts) => {
//             if (allUserPosts !== null) {
//                 res.status(200).json(allUserPosts);
//             } else {
//                 res.status(400).json("We could not find any posts with that ID!");
//             }
//         })
//         .catch ((err) => {
//             res.status(400).json(err);
//         });
//     }
//     catch (err) {
//         res.status(400).json(err);
//     };
// });

router.post('/', async (req, res) => {
    try {

        if (req.body.post_title && req.body.post_body && req.body.user_id) {
            const newPostData = {
                post_title: req.body.post_title,
                post_body: req.body.post_body,
                created_at: Date.now(),
                user_id: req.body.user_id
            }

            //console.log(newPostData);
    
            const createPost = await Post.create(newPostData)
            .then((createPost) => {
                res.status(200).json(createPost);
            })
            .catch((err) => {
                res.status(400).json(err);
            })
        } else {
            res.status(400).json("Please make sure that you include a post title, body, and user_id!");
        };
    }
    catch (err) {
        res.status(400).json(err);
    };
});


/* TODO: Needs refactoring. Both of the routes that rely on identifying
an entry by it's ID are running into issues. I think I messed up something
with the associations or models. 

NOT NEEDED FOR MVP
*/
router.put('/:id', withAuth, async (req, res) => {
    try {
        const findPost = await Post.findByPk({
            where: {
                id: req.params.id,
            }
        })
        .then((findPost) => {
            if (findPost !== null) {

                const updateData = {
                    ...req.body,
                    updated_at: Data.now(),

                };

                const updatePost = Post.update(
                    updateData,
                {
                    where: {
                        id: req.params.id,
                        user_id: req.session.user_id,
                    },
                })
                .then((updatePost) => {
                    if (updatePost) {
                        res.status(200).json("Post has been updated successfully!");
                    } else {
                        res.status(400).json("Could not update post at this time, please try again!");
                    };
                })
                .catch((err) => {
                    res.status(400).json("Could not update post at this time, please try again!");
                })
            } else {
                res.status(400).json("Could not find post by ID, please try again!");
            }
        })
    }
    catch (err) {
        res.status(400).json(err);
    };
});

router.delete('/:id', async (req, res) => {
    try {
      const removeData = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id
        },
      });
      if (removeData) {
        res.status(200).json("Removed the post entry successfully");
      } else {
        res.status(404).json('No post found with this id!');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
