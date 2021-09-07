const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const bookSchema = require('./Book')
const studentSchema = require('./Student')
const logSchema = require('./Log')


const teacherSchema = new Schema(
    {
        
        firstName: {
            type: String,
            required: true,
            trim: true
          },
          lastName: {
            type: String,
            required: true,
            trim: true
          },
          email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!'],
          },
          password: {
            type: String,
            required: true,
            minlength: 7,
          },
          books: [bookSchema],

          students: [studentSchema],

          logs: [logSchema],
    }

);

// hash user password
teacherSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// // custom method to compare and validate password for logging in
teacherSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};


const Teacher = model('TeacherModel', teacherSchema);
module.exports = Teacher;