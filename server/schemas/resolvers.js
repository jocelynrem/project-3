const {  TestModel, Book, Teacher, Student, Log } = require('../models');

const resolvers = {
  Query: {
    teachers: async () => {
      console.log("I GOT HIT")
      return await Teacher.find({});
    }
    ,
    findtheteacher: async (parent, args) => {
      console.log("WHAT ARE YOU", args)
      return await Teacher.findById(args.id);
    }

    // me: async (parent, args, context) => {
    //   if (context.teacher) {
    //     const teacherData = await Teacher.findOne(
    //       { _id: context.teacher._id }
    //       ).select('-__v -password');

    //     return teacherData;
    //   }

    //   throw new AuthenticationError('Not logged in');
    // },
  }
  ,

  Mutation: {
    addTeacher: async (parent, {firstName, lastName, email, password}) => {
      console.log("args", firstName, lastName, email, password);
      const user = await Teacher.create({firstName, lastName, email, password});
      //const token = signToken(user);
      console.log("user", user);
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
