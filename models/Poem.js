const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/connection");

class Poem extends Model {}

Poem.init(
  {
    PoemId: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    author: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
  }
);

module.exports = Poem;