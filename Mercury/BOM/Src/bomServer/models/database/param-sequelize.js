var Sequelize = require("sequelize");

class ParamSequelize extends Sequelize {
    constructor(){
        super(undefined,undefined,undefined,{
            dialect: 'sqlite',
            storage: 'sqlite/param.sqlite',
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
          });

        // 检查链接
        this.authenticate()
        .then(() => {
            console.log('Sequelize connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
    }
}

var paramSequelize = new ParamSequelize();

module.exports = paramSequelize;