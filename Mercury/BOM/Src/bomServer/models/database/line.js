 var Sequelize = require('sequelize');
 var paramSequelize = require("./param-sequelize");

const line = paramSequelize.define('line', {
    // attributes
    Id: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  Name: {
    type: Sequelize.STRING
  },
  IsDefaultLine: {
    type: Sequelize.STRING
  }
});

line.sync().then(() => {
        console.log("line table has created successfuly");
    });

module.exports = line;