'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Booking.init({
    UserId: DataTypes.INTEGER,
    HotelId: DataTypes.INTEGER,
    checkin_date: DataTypes.DATE,
    checkout_date: DataTypes.DATE,
    duration: DataTypes.INTEGER,
    DP_status: DataTypes.STRING,
    total_price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};