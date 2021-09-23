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
    comments: String
  }
  type Book {
    _id: ID
    title: String!
    authors: [String]
    ISBN: String
    description: String
    bookId: String
    copiesAvailable: Int
    copiesCheckedOut: Int
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
  input BookInfo {
    title: String!
    authors: [String]
    ISBN: String,
    description: String,
    copiesAvailable: Int,
    copiesCheckedOut: Int
  }
  input StudentInfo {
    firstName: String!,
    lastName: String!,
    comments: String
  }
  type Query {
    test: [TestModel]
    teachers: [Teacher]
    findtheteacher(id: ID!): Teacher
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addTeacher(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addBook(teacherId: ID!, bookInfo: BookInfo!): Teacher
    addStudent(teacherId: ID!, studentInfo: StudentInfo!): Teacher
    modifyTeacher(id: String!, firstName: String!, lastName: String!, email: String!): Auth
    removeStudent(teacherId: ID!, studentInfo: StudentInfo!): Teacher 
    removeBook(teacherId: ID!, bookInfo: BookInfo!): Teacher 
  }
`;

module.exports = typeDefs;

//     addBook(teacherId: ID!, title: String!, author: String!, ISBN: String!, description: String!): Teacher

//     me: Teacher