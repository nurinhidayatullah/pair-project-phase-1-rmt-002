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
      Hotel.belongsTo(models.i, {foreignKey: 'IId'})
      Hotel.belongsToMany(models.User, {through: 'Booking', foreignKey: 'HotelId'})
    }

    plusHotel(name) {
      return `${name} Hotel`
    }
  };
  Hotel.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: false,
          msg: 'Nama hotel tidak boleh kosong'
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: false,
          msg: 'Lokasi tidak boleh kosong'
        }
      }
    },
    roomsavailable: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: false,
          msg: 'Ruangan tidak boleh kosong'
        },
        isMin: (value) => {
          if(value < 1) {
            throw new Error('Ruangan minimal 1')
          }
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: false,
          msg: 'Price tidak boleh kosong'
        },
        isMin: (value) => {
          if(value < 1) {
            throw new Error('Harga minimal 1')
          }
        }
      }
    },
    IId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: false,
          msg: 'Harap pilih id gambar yang tersedia'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Hotel',
  });
  return Hotel;
};