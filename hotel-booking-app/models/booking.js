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
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    },
    HotelId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    },
    checkin_date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: true
      }
    },
    checkout_date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: true
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    },
    DP_status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    total_price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    },
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        instance.duration = `${(instance.checkout_date - instance.checkin_date)/3600/1000/24}`;
        return sequelize.models.Hotel.findByPk(instance.HotelId)
        .then(hotel => {
          instance.total_price = `${instance.duration * hotel.price}`
        })
      }
    },
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};