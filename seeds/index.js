const seedUser = require('./userSeeds');

const seedPost = require('./postSeeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true })
    
    const userData = await seedUser();
    const postData = await seedPost();

    console.log("Seeding database...........");

    process.exit(0);
};

seedAll();