const { gql } = require('apollo-server-express');

// **** Add 'me: Teacher' back into 'type: Query' when Auth is added ****
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
    books: [Book]
    students: [Student]
    logs: [Log]
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

  type Auth {
    token: ID!
    teacher: Teacher
  }

  type Query {
    test: [TestModel]
    teachers: [Teacher]
    findtheteacher(id: ID!): Teacher
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addTeacher(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addStudent(firstName: String!, lastName: String!, lexile: String)
  }
`;

module.exports = typeDefs;


