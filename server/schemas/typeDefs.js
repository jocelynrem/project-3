const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type TestModel {
    _id: ID
    test: String!
  }

  type Teacher {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    books: [Book]!
    students: [Student]!
    logs: [Log]!
  }


  type Student {
    _id: ID
    firstName: String!
    lastName: String!
    lexile: Int
    comments: String
    teacherID: Teacher
  }

  type Book {
    _id: ID
    title: String
    author: String
    ISBN: String
    description: String
    lexile: Int
    copiesAvailable: Int
    copiesCheckedOut: Int
    teacherID: Teacher
  }

  scalar Date

  type Log {
    _id: ID
    checkoutDate: Date
    expectedCheckinDate: Date
    checkinDate: Date
    comments: String
    teacherID: Teacher
    studentID: Student
    bookID: Book
  }

  type Query {
    test: [TestModel]
    me: Teacher
  }

  type Mutation {
    login(email: String!, password: String!): Teacher
    addUser(username: String!, email: String!, password: String!): Teacher
  }
`;

module.exports = typeDefs;


