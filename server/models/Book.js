const { Schema, model } = require('mongoose');
const bookSchema = new Schema(
  {

    title: {
      type: String,
      required: true,
      trim: true
    },
    authors: [
      {
        type: String,
      },
    ],
    ISBN: {
      type: String,
    },
    description: {
      type: String
    },
    // bookId: {
    //   type: String,
    // },
    copiesAvailable: {
      type: Number,
      min: 0,
      max: 1000,
      default: 0
    },
    copiesCheckedOut: {
      type: Number,
      min: 0,
      max: 1000,
      default: 0
    }
  }

);
const BookModel = model('BookModel', bookSchema);
module.exports = bookSchema;
