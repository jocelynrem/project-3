const { Schema, model } = require('mongoose');
const bookSchema = new Schema(
    {
        
        title: {
            type: String,
            required: true,
            trim: true
          },
          author: {
            type: String,
            required: true
          },
          ISBN: {
            type: String,
            required: true
          },
          description: {
            type: String
          },
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
