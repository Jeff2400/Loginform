import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('formdb', 'root', 'SQLsmiles9118', {
  host: 'localhost',
  dialect: 'mysql', 
});

export default sequelize;
