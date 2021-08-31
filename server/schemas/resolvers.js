const {  TestModel, Book, Teacher, Student, Log } = require('../models');

const resolvers = {
  Query: {
    test: async () => {
      return await TestModel.find({});
    }
  }
};

module.exports = resolvers;
