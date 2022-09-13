const User = require("./User");

const Poem = require("./Poem");

User.hasMany(Poem);
Poem.belongsTo(User);


module.exports = { Poem, User };
