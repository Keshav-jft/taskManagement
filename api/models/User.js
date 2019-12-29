/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var uuid=require('node-uuid');
module.exports = {

  attributes: {
    userId:{
      type:'number',
      autoIncrement:true
    },
    firstName:{
      type:'string'
    },
    lastName:{
      type:'string'
    },
    email:{
      type:'string'
    },
    password:{
      type:'string'
    },
    role: {
      collection: 'role',
      via: 'user',
      dominant: true
    },
    mobileNumber:{
      type:'string'
    },
    whatsAppNumber:{
      type:'string'
    },
    designation:{
      type:'string'
    },
    department:{
      type:'string'
    },
    postingPlace:{
      type:'string'
    },
    isDeleted:{
      type:'boolean',
      defaultsTo:false
    }

  },
  beforeCreate: function (values, next) {
    values.password = CipherService.hashPassword(values);
    next();
  }
};

