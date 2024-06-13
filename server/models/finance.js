const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcryptjs');

class Finance extends Model { }

Finance.init(
 {
  finance_id: {
   type: DataTypes.INTEGER,
   autoIncrement: true,
   allowNull: false,
   primaryKey: true
  },
  finance_name: {
   type: DataTypes.STRING,
   allowNull: false
  },
  finance_email: {
   type: DataTypes.STRING,
   allowNull: false
  },
  document_password: {
   type: DataTypes.STRING,
   allowNull: false
  },
 },
 {
  sequelize,
  underscored: true,
  freezeTableName: true,
  modelName: 'finance',
 }
);


module.exports = Finance;