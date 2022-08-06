import {Sequelize} from "sequelize";

const {REACT_APP_DATABASE_HOST} = process.env;

const db = new Sequelize('people','people','people',{
    host: `${REACT_APP_DATABASE_HOST}`,
    dialect: 'mysql'
});

export default db;