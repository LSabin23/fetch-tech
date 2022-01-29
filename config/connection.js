require('dotenv').config()

// import the Sequelize constructor from the library
const Sequelize = require('sequelize')

// create connection to our database, pass in your MySQL information for username and password
let sequelize

/*
  Was receiving an ACCESS DENIED error in this project when using credentials that worked on other projects. Had to console log these env variables to see what sequelize was seeing as credentials and discovered dotenv version 14+ was ignoring a character so switched it to dotenv version 10.0.0.
*/
// console.log(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW)

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL)
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  })
}

module.exports = sequelize
