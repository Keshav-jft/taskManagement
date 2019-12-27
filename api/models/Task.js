/**
 * Task.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var uuid=require('node-uuid');
module.exports = {

  attributes: {
    id:{
      type:'string',
      defultsTo:uuid.v4,
      primaryKey:true
    },
    taskNumber:{
      type:'integer'
    },
    taskName:{
      type:'string'
    },
    assignedTo:{
      model:'user'
    },
    assignedBy:{
      model:'user'
    },
    completedDate:{
      type:'string'
    },
    toJSON: function () {
      var obj = this.toObject();
      return obj;
    }
  },
  autopk:false
};

