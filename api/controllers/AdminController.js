/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
   adminDashboard:async function(req,res) {
     try {
       console.log('adminDashboard')

     } catch (err) {

     }
   },
   addTask:async function(req,res) {
    try {
      if(req.method==='GET') {
        let roles = await Role.find()
        return res.view('admin/addUser',{layout:HelperService.getLayout(req.user.role),roles});
      }else {
        let postData = req.allParams();
        console.log('postData',postData)
        if(!postData.firstName
          || !postData.lastName
          || !postData.email
          || !postData.mobileNumber
          || !postData.whatsAppNumber
          || !postData.designation
          || !postData.department
          || !postData.postingPlace
          || !postData.role
        ){
          let message = HelperService.toastrMessageError('all fields are mandetory')
          req.flash('errorMsg', message);
          res.redirect('back');
          return;
        }
        let createdUser = await User.create({
          firstName:postData.firstName,
          lastName: postData.lastName,
          email: postData.email,
          mobileNumber: postData.mobileNumber,
          whatsAppNumber:postData.whatsAppNumber,
          designation:postData.designation,
          department: postData.department,
          postingPlace: postData.postingPlace,
          role: postData.role
        })
        if(!createdUser) {
          let message = HelperService.toastrMessageError('User not created!')
          req.flash('errorMsg', message);
          res.redirect('back');
          return;
        }
        let message =HelperService.toastrMessageSuccess('User created!')
        req.flash('message', message);
        return res.redirect('/admin/userList');
        /* let message =HelperService.toastrMessageSuccess('Task created!')
         req.flash('message', message);
         return res.redirect('/viewTask/'+createdTask.id)
    */   }
    } catch (err) {
      console.log('Error   :',err);
      return res.view('500')
    }
  },
	 userList:async function(req,res){
	   try{
       console.log('userList')
       let userList = await User.find().populate('role');
       return res.view('admin/users',{layout:HelperService.getLayout(req.user.role),userList});
     }catch(err){
	     console.log('err --------:',err);
	     return res.view('500')
     }


   }
};

