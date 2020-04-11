const { gql } = require("apollo-server-express");
module.exports = gql`
  extend type Query {
    users: [User]
    user: User
    profile: Profile
    mychannel: [Channel]
  }
  extend type Mutation {
      createUser(email: String!): Token
      forgetPassword(email: String!): Token
      verifyEmail(otp: String!): Boolean
      createPassword(password: String!): Boolean
      login(email: String, password: String, authtype: String!): Token
      updateProfile(
          profilePic: String
          firstName: String
          color_scheme: Int
          plan_type: String
          privateProfile: Boolean
      ): Boolean
      makePayment(token: String): Boolean
      createChannel(
          stationName: String
          albumimage: String
          tracks: String
      ): [Channel]
  }
  type Token {
    token: String
    redirectTo: String
  }
  type Profile {
    id: Int
    firstName: String
    profilePic: String
    color_scheme: Int
    plan_type: String
    private: Boolean
  }
  type User {
    id: Int
    username: String
    password: String
    email: String
    emailotp: String
    facebookauth: String
    googleauth: String
    Profile: Profile
    emailverified: String
  }
  type Channel {
    id: Int
    userid: Int
    stationName: String
    albumimage: String
    tracks: String
  }
`;
