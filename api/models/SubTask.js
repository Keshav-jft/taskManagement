/**
 * SubTask.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
const uuid=require('node-uuid');
module.exports = {

  attributes: {
     title:{
       type:'string'
     },
    task:{
       model:'task'
    },
    completedDate:{
       type:'string'
    },
  },
  autoPK: false,
};

