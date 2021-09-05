const {  TestModel, Book, Teacher, Student, Log } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

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
    },

    me: async (parent, args, context) => {
      if (context.teacher) {
        const teacherData = await Teacher.findById(
          { _id: context.teacher._id }
          ).select('-__v -password');

        return teacherData;
      }

      // throw new AuthenticationError('Not logged in');
    },
  }
  ,

  Mutation: {
    addTeacher: async (parent, {firstName, lastName, email, password}) => {
      console.log("args from addTeacher mutation", {firstName, lastName, email, password});
      const teacher = await Teacher.create({firstName, lastName, email, password});
      const token = signToken(teacher);
      console.log('token!!!!!!!!', token);
      console.log("user!!!!!!!", teacher);

      return {token, teacher};
        // return user
    },
    
    login: async (parent, { email, password }) => {
      console.log(email, password)
      const teacher = await Teacher.findOne({ email });

      if (!teacher) {
        throw new AuthenticationError('Incorrect email');
      }

      const correctPw = await teacher.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password');
      }

      const token = signToken(teacher);
      console.log('Am i logged in?!', correctPw);
      return { token, teacher };
      // return user;
    }
  }
};

module.exports = resolvers;
