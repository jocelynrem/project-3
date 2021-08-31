const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type TestModel {
    _id: ID
    test: String!
  }

  type Teacher {
    _id: ID
    firstName: String
    lastName: String
  }


  type Student {
    _id: ID
    firstName: String
    lastName: String
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
  }
`;

module.exports = typeDefs;


