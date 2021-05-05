const _ = require('lodash');
const mongoose = require('mongoose');

const removeMyEmpty = (obj) => {
  let result = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if ((value === 0 || value === false) && (!_.isEmpty(value))) {
        if (typeof value == 'object') {
          result[key] = removeMyEmpty(value);
        } else {
          result[key] = value;
        }
      }
    }
  }
  return obj;
};

const isMongooseModel = (obj) => {
  obj = obj || {};
  return obj.prototype instanceof mongoose.Model;
};

module.exports = {
  removeMyEmpty,
  isMongooseModel
};