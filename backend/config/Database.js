import {Sequelize} from "sequelize";

const db = new Sequelize('people','people','people',{
    host: 'db',
    dialect: 'mysql'
});

export default db;