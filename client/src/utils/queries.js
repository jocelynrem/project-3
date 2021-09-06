import { gql } from '@apollo/client'

export const QUERY_TEACHERS = gql`
  query allTeachers {
    teachers {
      _id
      firstName
      lastName
      email
    }
  };
`

export const GET_FINDTHETEACHER = gql`
query findtheteacher($id: ID!) {
  findtheteacher(id: $id) {
		firstName
    lastName
    email
    logs {
      checkinDate
      checkoutDate
    }
  }
};
`

export const QUERY_ME = gql`
  query me {
    me {
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



// export const GET_FINDTHETEACHER = gql`
//   {
//     findtheteacher {
//       _id
//       firstName
//       lastName
//       email
//       password
//       books {
//         _id
//         title
//         auther
//         ISBN
//         description
//         lexile
//         copiesAvailable
//         copiesCheckedOut
//         teacherID
//       }
//       students {
//         _id
//         firstName
//         lastName
//         lexile
//         comments
//         teacherID
//       }
//       logs {
//         _id
//         checkedOutDate
//         expectedCheckinDate
//         checkinDate
//         comments
//         teacherID
//         studentID
//         bookID
//       }
//     }
//     , 
//     test {
//       _id
//       test
//     }
//   }