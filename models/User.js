const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const { sequelize } = require("../config/connection");

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);

  }
}
User.init(
  {
    username: {
      type: DataTypes.STRING ,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,

      },
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: true,
        notEmpty: true,
        len:[10],
      },
    },
  },
  // {
  //   classMethods: {
  //     validPassword: function(password, pw, done, user){
  //       bcrypt.compare(password, pw, function(err, isMatch){
  //         if(err) {
  //           console.log(err);
  //         }
  //         if(isMatch) {
  //           return done(null, user);
  //         } else {
  //           return done(null, false);
  //         }
  //       });
  //     }
  //   }
  // },

  {
    hooks: {
      beforeCreate: async (newUserData)=>{
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,

  }
);

module.exports = User;
