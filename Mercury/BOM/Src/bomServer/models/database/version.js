var Sequelize = require('sequelize');
var paramSequelize = require("./param-sequelize");

const version = paramSequelize.define('version', {
    // attributes
    VersionId: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    VersionDate: {
        type: Sequelize.TIME
    },
    VersionType: {
        type: Sequelize.STRING
    },
    VersionValidate: {
        type: Sequelize.TIME
    },
    ValidateType: {
        type: Sequelize.STRING
    },
    InValidateTime: {
        type: Sequelize.TIME
    },
    VersionSystem: {
        type: Sequelize.STRING
    },
    VersionOper: {
        type: Sequelize.STRING
    },
    FormatVersion: {
        type: Sequelize.STRING
    },
});

version.sync().then(() => {
       console.log("version table has created successfuly");
   });

module.exports = version;