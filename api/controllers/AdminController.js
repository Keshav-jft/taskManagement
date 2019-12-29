/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  adminDashboard: async function (req, res) {
    try {
      console.log('adminDashboard')

    } catch (err) {

    }
  },
  addUser: async function (req, res) {
    try {
      if (req.method === 'GET') {
        let user =  await User.findOne({id:req.query.userId}).populate('role');
        console.log("user data found...",user);
        if(user){
          user.roleId = user.role[0].id;
        }
        let roles = await Role.find();
        return res.view('admin/addUser', {layout: HelperService.getLayout(req.user.role), roles,userData:user || {}});
      } else {
        let postData = req.allParams();
        let userId = postData.userId;
        let createdUser = null;
        if(!userId){
          createdUser = await User.create({
            firstName: postData.firstName,
            lastName: postData.lastName,
            email: postData.email,
            mobileNumber: postData.mobileNumber,
            whatsAppNumber: postData.whatsAppNumber,
            designation: postData.designation,
            department: postData.department,
            postingPlace: postData.postingPlace,
            role: postData.role
          });
        }else{

          createdUser = await User.update({id:userId},{
            firstName: postData.firstName,
            lastName: postData.lastName,
            email: postData.email,
            mobileNumber: postData.mobileNumber,
            whatsAppNumber: postData.whatsAppNumber,
            designation: postData.designation,
            department: postData.department,
            postingPlace: postData.postingPlace,
            role: postData.role
          });
         createdUser = createdUser[0]
        }

        console.log('postData..................', postData)
        /*if (!postData.firstName
          || !postData.lastName
          || !postData.email
          || !postData.mobileNumber
          || !postData.whatsAppNumber
          || !postData.designation
          || !postData.department
          || !postData.postingPlace
          || !postData.role
        ) {
          let message = HelperService.toastrMessageError('all fields are mandetory')
          req.flash('errorMsg', message);
          res.redirect('back');
          return;
        }*/


        if (!createdUser) {
          let message = HelperService.toastrMessageError('User not created!')
          req.flash('errorMsg', message);
          res.redirect('back');
          return;
        }
        let message = HelperService.toastrMessageSuccess('User created!')
        req.flash('message', message);
        return res.redirect('/admin/userList');
        /* let message =HelperService.toastrMessageSuccess('Task created!')
         req.flash('message', message);
         return res.redirect('/viewTask/'+createdTask.id)
         */
      }
    } catch (err) {
      console.log('Error   :', err);
      return res.view('500')
    }
  },
  deleteUser: async function(req,res){
    try {
      let userId = req.query.userId;
      if (!userId) {
        return res.send({message: 'Missing user id', status: false});
      }
      let user = await User.findOne({id: userId});
      if (user && user.isDeleted) {
        return res.send({message: 'This user already deleted, Please refresh the page and try again', status: false});
      }
      user.isDeleted = true;
      await user.save();
      return res.send({message: 'User has been deleted successfully', status: true});
    }catch(e){
      return res.send({message:e.message, status: false});
    }
    },
  userList: async function (req, res) {
    try {
      console.log('userList');
      let userList = await User.find({isDeleted:false}).populate('role');
      console.log('userlist........',userList);
      return res.view('admin/users', {layout: HelperService.getLayout(req.user.role), userList});
    } catch (err) {
      console.log('err --------:', err);
      return res.view('500')
    }
  }
};

