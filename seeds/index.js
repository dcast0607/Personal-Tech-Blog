const seedUser = require('./userSeeds');

const seedPost = require('./postSeeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    await seedUser();
    console.log('\n----- USER SEEDED -----\n');

    await seedPost();
    console.log('\n----- POST SEEDED -----\n');

    process.exit(0);
};

seedAll();