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
           books: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Book',
            },
          ]
          , students: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Student',
            },
          ]
          , logs: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Log',
            },
          ]


    }

);
const TeacherModel = model('TeacherModel', teacherSchema);
module.exports = teacherSchema;