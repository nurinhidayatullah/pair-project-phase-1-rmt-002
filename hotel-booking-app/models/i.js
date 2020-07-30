'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class i extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      i.belongsTo(models.Hotel, {foreignKey: 'HotelId'})
    }
  };
  i.init({
    source: DataTypes.STRING,
    HotelId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'i',
  });
  return i;
};