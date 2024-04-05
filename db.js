const mongoose = require('mongoose');
const { connectionString } = process.env.DBFile || require('./DatabaseConnectionString');

mongoose.connect(connectionString);

const TodoSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = {
    Todo
}