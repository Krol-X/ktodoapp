const mongoose = require('mongoose');
const tools = require('../tools');

const todoItemSchema = mongoose.Schema({
  title: {type: String, default: ''},
  done: {type: Boolean, default: false},
  description: {type: String, default: ''}
});

todoItemSchema.statics.addItem = function (item, cb) {
  return item.save(cb);
};

todoItemSchema.statics.findItemById = function (_id, cb) {
  if (mongoose.Types.ObjectId.isValid(_id)) {
    return this.findOne({_id}, cb);
  } else {
    return console.log('Incorrect ID!');
  }
};

todoItemSchema.statics.findItems = function (req, cb) {
  return this.find(tools.removeMyEmpty(req), cb);
};

todoItemSchema.methods.deleteItem = function (cb) {
  this.model('TodoItem').deleteOne({_id: this._id}, cb);
};

const TodoItem = mongoose.model('TodoItem', todoItemSchema);
module.exports = TodoItem;