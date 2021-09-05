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
          lexile: {
            type: Number
          },
          copiesAvailable: {
            type: Number,
            min: 0,
            default: 0
          },
          copiesCheckedOut: {
            type: Number,
            min: 0,
            default: 0
          }, 
          // teacherID: {
          //   type: Schema.Types.ObjectId,
          //   ref: 'Teacher',
          //   required: true
          // }
    }

);
const BookModel = model('BookModel', bookSchema);
module.exports = bookSchema;
