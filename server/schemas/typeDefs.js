const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type TestModel {
    _id: ID
    test: String!
  }

  type Query {
    test: [TestModel]
  }
`;

module.exports = typeDefs;
