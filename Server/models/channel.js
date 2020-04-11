const ChannelModel = (sequelize, type) => {
  return sequelize.define("Channel", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userid: {
      type: type.INTEGER,
      allowNull: true
    },
    stationName: {
      type: type.STRING,
      allowNull: true
    },
    albumimage: {
      type: type.STRING,
      allowNull: true
    },
    tracks: {
      type: type.STRING,
      allowNull: true
    }
  });
};

module.exports = {
  ChannelModel
};
