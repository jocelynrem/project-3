const { Schema, model } = require('mongoose');
const studentSchema = new Schema(
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
          comments: {
            type: String
          },
          // teacherID: {
          //   type: Schema.Types.ObjectId,
          //   ref: 'Teacher',
          //   required: true
          // }
    }

);
const StudentModel = model('StudentModel', studentSchema);
module.exports = studentSchema;