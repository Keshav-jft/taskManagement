/**
 * DashboardController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports= moment = require('moment');
module.exports = {
  adminDashboard: async function (req, res) {
    let totalTask = await Task.count();
    let openTask = await Task.count({status:'Open'});
    let inProgressTask = await Task.count({status:'In Progress'});
    let closedTask = await Task.count({status:'Closed'});
    let taskStatus=JSON.stringify([["TOTAL",totalTask],["OPEN",openTask],["IN PROGRESS",inProgressTask],["CLOSE",closedTask]])
    let foundUser = await Role.findOne({authority:'ROLE_USER'}).populate('user')
    let foundCoordinator = await Role.findOne({authority:'ROLE_COORDINATOR'}).populate('user')
    let foundAdmin = await Role.findOne({authority:'ROLE_ADMIN'}).populate('user')
    let foundSuperAdmin = await Role.findOne({authority:'ROLE_SUPER_ADMIN'}).populate('user')
    let lowTask = await Task.count({priority:'Low'})
    let mediumTask = await Task.count({priority:'Medium'})
    let highTask = await Task.count({priority:'High'})

    let  userType =[{
      name: 'user',
      y: foundUser.user.length,
      sliced: true,
      selected: true
    }, {
      name: 'Coordinator',
      y: foundCoordinator.user.length
    },{
      name: 'Admin',
      y: foundAdmin.user.length
    },
      {
        name: 'Super Admin',
        y: foundSuperAdmin.user.length
      }]
    let taskPriority= [{
      name: 'LOW',
      y: lowTask,
    }, {
      name: 'HIGH',
      y: highTask,
    }, {
      name: 'MEDIUM',
      y: mediumTask,
    }]
    return res.view('admin/dashboard', {
      layout: HelperService.getLayout(req.user.role),
      taskStatus,userType:JSON.stringify(userType),taskPriority:JSON.stringify(taskPriority)
    });

  },
};

