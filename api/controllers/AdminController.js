/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	 userList:async function(req,res){
	   try{
       if(req.method==='POST'){
         let reqData=req.allParams();
         if(!reqData.firstName || !reqData.lastName || !reqData.email){
           return res.json({status:false,message:'user not created Successfully'});
         }
         let user=await User.create(reqData);
         if(user){
           return res.view('admin/user',{layout:'layouts/adminLayout',user:user})
         }
       }else{
         let users=await User.find();
         return res.view('admin/user',{layout:'layouts/adminLayout',users:users});
       }
     }catch(err){
	     console.log('err --------:',err);
     }


   }
};

