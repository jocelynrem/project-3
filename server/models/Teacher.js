const { Schema, model } = require('mongoose');
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

    }

);
const TeacherModel = model('TeacherModel', teacherSchema);
module.exports = teacherSchema;