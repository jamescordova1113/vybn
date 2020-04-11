const Sequelize = require("sequelize");
const { UserModel } = require("./user");
const { ProfileModel } = require("./profile");
const { ChannelModel } = require("./channel");
const sequelize = new Sequelize("vybn", "user", "1qaz2wsx", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: true
});

const User = UserModel(sequelize, Sequelize);
const Profile = ProfileModel(sequelize, Sequelize);
const Channel = ChannelModel(sequelize, Sequelize);
Profile.belongsTo(User);
User.hasOne(Profile);
//sequelize.sync({ force: true });
module.exports = {
  User,
  Profile,
  Channel
};
