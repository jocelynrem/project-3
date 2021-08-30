const { Schema, model } = require('mongoose');

const testSchema = new Schema(
    {
        test: String
    }
);

const TestModel = model('TestModel', testSchema);

module.exports = TestModel;