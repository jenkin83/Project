 var Sequelize = require('sequelize');
 var paramSequelize = require("./param-sequelize");

const station = paramSequelize.define('station', {
    // attributes
    Id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false
    },
    Name: {
      type: Sequelize.STRING
    },
    StationName_En: {
      type: Sequelize.STRING
    },
    StationNo_Ex: {
      type: Sequelize.STRING
    }
});

station.sync().then(() => {
        console.log("station table has created successfuly");
    });

module.exports = station;