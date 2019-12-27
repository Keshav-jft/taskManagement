/**
 * Role.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    authority: {
      type: 'string',
      required: true,
      unique: true
    },
    user: {
      collection: 'user',
      via: 'role'
    },
    toJSON: function () {
      var obj = this.toObject();
      return obj;
    }
  }
};

