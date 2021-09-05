import { gql } from '@apollo/client';
// *** Can uncomment 'GET_ME' when the Auth is added ***

export const GET_FINDTHETEACHER = gql`
  {
    findtheteacher {
      _id
      firstName
      lastName
      email
      password
      books {
        _id
        title
        auther
        ISBN
        description
        lexile
        copiesAvailable
        copiesCheckedOut
      }
      students {
        _id
        firstName
        lastName
        lexile
        comments
      }
      logs {
        _id
        checkedOutDate
        expectedCheckinDate
        checkinDate
        comments
        studentID
        bookID
      }
    }
    , 
    test {
      _id
      test
    }
  }



`;

export const QUERY_ME = gql`
  {
    me {
      _id
      firstName
      lastName
      email
      password
      books {
        _id
        title
        auther
        ISBN
        description
        lexile
        copiesAvailable
        copiesCheckedOut
        teacherID
      }
      students {
        _id
        firstName
        lastName
        lexile
        comments
        teacherID
      }
      logs {
        _id
        checkedOutDate
        expectedCheckinDate
        checkinDate
        comments
        teacherID
        studentID
        bookID
      }
    }
    , 
    test {
      _id
      test
    }
  }



`;
