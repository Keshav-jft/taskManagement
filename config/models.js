const uuid=require('uuid');
module.exports.models = {
  connection:'someMysqlServer',
  migrate: 'alter',
  attributes: {
    createdAt: { type: 'datetime', autoCreatedAt: true, },
    updatedAt: { type: 'datetime', autoUpdatedAt: true, },
    id: { type: 'string',primaryKey:true,defaultsTo:uuid.v4},
  },
};
