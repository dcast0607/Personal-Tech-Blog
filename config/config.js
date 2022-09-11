require('dotenv').config(); // this is important!
module.exports = {
"development": {
    "DB_NAME": "root",
    "DB_PASSWORD": "rootroot",
    "DB_NAME": "techBlogDB",
    "dialect": "mysql"
},
"test": {
    "DB_NAME": "root",
    "DB_PASSWORD": "rootroot",
    "DB_NAME": "techBlogDB",
    "dialect": "mysql"
},
"production": {
    "use_env_variable": "JAWSDB_BROWN_URL",
    "dialect": "mysql"
}
};