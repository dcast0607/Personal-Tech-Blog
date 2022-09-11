const { User } = require('../models');

const userData = [
    {
        username: 'tester1',
        email: 'tester1@mailnator.com',
        password: 'password12345',
        name: 'John Tester',
    },
    {
        username: 'tester2',
        email: 'tester2@mailnator.com',
        password: 'password2022',
        name: 'Jane Tester',
    },
    {
        username: 'tester3',
        email: 'tester3@mailnator.com',
        password: 'roboto12345',
        name: 'John Doe',
    },
    {
        username: 'tester4',
        email: 'tester4@mailnator.com',
        password: 'guest12345',
        name: 'Jane Doe',
    }
];

const seedUser = async () => {
    await User.bulkCreate(userData);
}

module.exports = seedUser;