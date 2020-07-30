'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Hotel.hasOne(models.i, {foreignKey: 'HotelId'})
    }
  };
  Hotel.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    location: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    roomsavailable: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    },
  }, {
    sequelize,
    modelName: 'Hotel',
  });
  return Hotel;
};