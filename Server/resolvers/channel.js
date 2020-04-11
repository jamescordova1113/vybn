const { User, Profile, Channel } = require("../models");

module.exports = {
  Query: {
    mychannel: async (parent, args, context, info) => {
      const channels = await Channel.findAll({ where: { userid: context.user.id } });
      return channels;
    }
  },

  Mutation: {
    createChannel: async (
        parent,
        { stationName, albumimage, tracks },
        context
    ) => {
        if (!context.user.id) throw new Error("Login to create channel");
        const userid = context.user.id;
        await Channel.create({ userid, stationName, albumimage, tracks });
        const channels = await Channel.findAll({ where: { userid: context.user.id } });
        return channels;
    },
  }
};
