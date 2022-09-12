
const { Model, DataTypes}= require ("sequelize");

class Poem extends Model {}

Poem.init({
    Id: {
        type: DataTypes.INTEGER ,
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
  
{ 
    sequelize,
}
   
);

module.exports = Poem;