/**
 * Task.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var uuid=require('node-uuid');
module.exports = {

  attributes: {
    taskNumber:{
      type: 'number',
      autoIncrement: true,
      unique:true,
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
    priority:{
      type : 'string',
      enum:HelperService.priority,
    },
    date:{
      type:'datetime'
    },
    deadline:{
      type:'datetime'
    },
    status:{
      type : 'string',
      enum:HelperService.status,
    },
    comments:{
      type:'text'
    },
    comment:{
      collection:'comment',
      via:'task'
    },
    isDeleted:{
      type:'boolean',
      defaultsTo:false
    }

  },
};

