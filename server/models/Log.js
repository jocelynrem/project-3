const { Schema, model } = require('mongoose');
const logSchema = new Schema(
    {
        
        checkoutDate: {
            type: Date,
            required: true,

          },
          expectedCheckinDate: {
            type: Date,
          },
          checkinDate: {
            type: Date,
          },
          comments: String,
          teacherID: {
            type: Schema.Types.ObjectId,
            ref: 'Teacher',
            required: true
          },
          studentId: {
            type: Schema.Types.ObjectId,
            ref: 'Student',
            required: true
          },
          bookID: {
            type: Schema.Types.ObjectId,
            ref: 'Book',
            required: true
          }
    }

);
const LogModel = model('LogModel', logSchema);
module.exports = logSchema;