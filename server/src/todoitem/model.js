const mongoose = require('mongoose');

const todoItemSchema = mongoose.Schema({
  title: {type: String, default: ''},
  done: {type: Boolean, default: false},
  description: {type: String, default: ''}
});

const TodoItem = mongoose.model('TodoItem', todoItemSchema);
module.exports = TodoItem;