const _ = require('lodash');
const mongoose = require('mongoose');

const removeEmptyNotFalse = (obj) => {
  return _.reduce(
    _.filter(Object.keys(obj), key => (obj[key] === false) || !!obj[key]),
    (result, key) => Object.assign({}, obj, {
      [key]: typeof obj[key] === 'object' ? removeEmpty(obj[key]) : obj[key]
    })
    //{...result, [key]: typeof obj[key] === "object"? removeEmpty(obj[key]): obj[key]} // ES6
  ) || {};
};

const isMongooseModel = (obj) => {
  obj = obj || {}
  return obj.prototype instanceof mongoose.Model
}

module.exports = {
  removeEmptyNotFalse,
  isMongooseModel
}