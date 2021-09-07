import { gql } from '@apollo/client';

// *** Add 'token' back in line 7 when Auth is created *** OLD ONE without token
// export const LOGIN_TEACHER = gql`
// mutation login($email: String!, $password: String!) {
//   login(email: $email, password: $password) {

//     _id
//     email
//     password
//   }
// }
// `;

export const LOGIN_TEACHER = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    teacher {
      _id
      firstName
      lastName
      email
    }
  }
}
`

// *** Add 'token' back in between line 18 and 19 when Auth is created *** OLD ADDTEACHER
// export const ADD_TEACHER = gql`
//   mutation addTeacher($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
//     addTeacher(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
//         _id
//         firstName
//         lastName
//         email
//         password
//     }
//   }
// `;

export const ADD_TEACHER = gql`
mutation addTeacher($firstName: String!, $lastName: String!, $email: String!, $password: String!){
  addTeacher(firstName: $firstName, lastName: $lastName, email: $email, password: $password){
    token
    teacher {
      _id
      firstName
    	lastName
    	email
    	password
    }
  }
}`;

export const ADD_BOOK = gql`
  mutation addBook($bookInfo: BookInput!) {
    addBook(bookInfo: $bookInfo) {
      _id
      firstName
      lastName
      email
      books {
          _id
          title
          author
          ISBN
          description
      }
    }
  }
`;

export const ADD_STUDENT = gql`
  mutation addStudent($studentInfo: StudentInfo!) {
    addStudent(studentInfo: $studentInfo) {
      _id
      firstName
      lastName
      email
      students {
          _id
          firstName
          lastName
          comments
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;
