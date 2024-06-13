const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcryptjs');

class Vendor extends Model {}

Vendor.init(
    {
    vendor_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    vendor_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contact_firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contact_lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contact_MiddleInt: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tax_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact_phone_number: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    remittance_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip_code:{
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    remittance_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    service_provided: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    minority_ownership: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },  
    authorized_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authorized_phone_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    authorized_signature: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    bank_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    account_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    routing_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    disclaimer_agreement: {
      type: DataTypes.STRING,
      defaultValue: "Agreed"
    },
  },
  {
    hooks: {
      async beforeCreate(newVendor) {
        try {
          newVendor.tax_id = await bcrypt.hash(newVendor.tax_id, 10);
          newVendor.account_number = await bcrypt.hash(newVendor.account_number, 10);
          newVendor.routing_number = await bcrypt.hash(newVendor.routing_number, 10);
        } catch (error) {
          throw new Error('Failed to hash tax_id');
        }
        return newVendor;
      },

      async beforeUpdate(updatedVendor) {
        if (updatedVendor.changed('tax_id')) {
          updatedVendor.tax_id = await bcrypt.hash(updatedVendor.tax_id, 10);
        }
        if (updatedVendor.changed('account_number')) {
          updatedVendor.account_number = await bcrypt.hash(updatedVendor.account_number, 10);
        }
        if (updatedVendor.changed('routing_number')) {
          updatedVendor.routing_number = await bcrypt.hash(updatedVendor.routing_number, 10);
        }
        return updatedVendor;
      },
    },
    sequelize,
    underscored: true,
    freezeTableName: true,
    modelName: 'vendor',
  }
);

module.exports = Vendor;