/**
 * DashboardController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports= moment = require('moment');
module.exports = {
  adminDashboard: async function (req, res) {
    return res.view('admin/dashboard', {
      layout: HelperService.getLayout(req.user.role),
    });

  },
};

