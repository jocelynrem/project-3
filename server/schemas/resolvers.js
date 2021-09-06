const { TestModel, Book, Teacher, Student, Log } = require('../models');
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
        return Teacher.findOne({ _id: context.teacher._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addTeacher: async (parent, { firstName, lastName, email, password }) => {
      console.log("args from addTeacher mutation", { firstName, lastName, email, password });
      const teacher = await Teacher.create({ firstName, lastName, email, password });
      const token = signToken(teacher);
      console.log('token from add teacher!!!!!!!!', token);
      console.log("teacher from add teacher!!!!!!!", teacher);

      return { token, teacher };
      // return teacher
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
      console.log('token from login!!!!!!!!', token);
      console.log("teacher from login!!!!!!!", teacher);
      return { token, teacher };
      // return teacher;
    }
  }
};

module.exports = resolvers;
