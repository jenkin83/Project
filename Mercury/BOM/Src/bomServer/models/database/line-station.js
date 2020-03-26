 var Sequelize = require('sequelize');
 var paramSequelize = require("./param-sequelize");

const lineStation = paramSequelize.define('line-station', {
    // attributes
    LineId: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  StationId: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  SortId: {
    type: Sequelize.INTEGER
  }
});

lineStation.sync({force:true}).then(() => {
        console.log("line-station table has created successfuly");
    });

module.exports = lineStation;