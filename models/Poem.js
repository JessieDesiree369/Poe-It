
const { Model, DataTypes} = require("sequelize");
const { sequelize } = require("../config/connection");
class Poem extends Model {}

Poem.init(
  {
    poemId: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
    },
    author:{
      type: DataTypes.STRING,
    },
    lines: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
  }
);

module.exports = Poem;