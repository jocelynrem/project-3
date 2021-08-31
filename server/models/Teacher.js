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
          }
    }

);
const TeacherModel = model('TeacherModel', teacherSchema);
module.exports = teacherSchema;