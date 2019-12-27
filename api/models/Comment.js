/**
 * Comment.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var uuid=require('node-uuid');
module.exports = {

  attributes: {
   id:{
     type:'string',
     primaryKey: true,
     defaultsTo:uuid.v4
   },
    description:{
     type:'string'
    },
    user:{
     model:'user'
    },
    task:{
     model:'task'
    },
    toJSON: function () {
      var obj = this.toObject();
      return obj;
    }
  },
  autoPk:false
};

