const {  TestModel, Book, Teacher, Student, Log } = require('../models');

const resolvers = {
  Query: {
    test: async () => {
      return await TestModel.find({});
    
    }
    ,
    me: async (parent, args, context) => {
      // if (context.user) {
        const teacherData = await Teacher.findOne({ _id: //context.
          Teacher._id }).select('-__v -password');

        return teacherData;
      // }

      // throw new AuthenticationError('Not logged in');
    },
  }
  ,

  Mutation: {
    addUser: async (parent, {firstName, lastName, email, password}) => {
      console.log("args", firstName, lastName, email, password);
      const user = await Teacher.create({firstName, lastName, email, password});
      //const token = signToken(user);

      // return { token, user };
      return user
    },
    login: async (parent, { email, password }) => {
      const user = await Teacher.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    }
  }
};

module.exports = resolvers;
