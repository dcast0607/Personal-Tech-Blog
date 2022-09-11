const { Post } = require('../models');

const postData = [
    {
        post_title: 'The Batman Review',
        post_body: 'This is a review of the most recent Batman movie',
        created_at: Date.now(),
        updated_at: Date.now(),
        user_id: 1,
    }, 
    {
        post_title: 'Bullet Train Review',
        post_body: 'This is a review of the Bullet Train movie',
        create_at: Date.now(),
        updated_at: Date.now(),
        user_id: 2,
    },
    {
        post_title: 'Top Gun: Maverick Review',
        post_body: 'This is a review of the Top Gun movie',
        created_at: Date.now(),
        updated_at: Date.now(),
        user_id: 1,
    }
];

const seedPost = async () => {
    await Post.bulkCreate(postData);
};

module.exports = seedPost;