const { Schema, model } = require('mongoose');
const logSchema = new Schema(
  {

    checkoutDate: {
      type: Date,
      default: Date.now,
      required: true,

    },
    expectedCheckinDate: {
      type: Date,
      default: () => Date.now() + 7 * 24 * 60 * 60 * 1000, // NEED TO CHECK TO SEE HOW THIS WORKS!
      required: true
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
    // bookID: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Book',
    //   required: true
    // }
  }

);
const LogModel = model('LogModel', logSchema);
module.exports = logSchema;