/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	addTask:async function(req,res) {
	  try {
	    if(req.method==='GET') {
	      let assignees = await User.find()
        return res.view('admin/addTask',{layout:HelperService.getLayout(req.user.role),assignees});
      }else {
        let postData = req.allParams();
        console.log('postData',postData)
        if(!postData.date
          || !postData.taskName
          || !postData.priority
          || !postData.assignee
          || !postData.deadline
          || !postData.status
          || !postData.comments){
          let message = HelperService.toastrMessageError('all fields are mandetory')
          req.flash('errorMsg', message);
          res.redirect('back');
          return;
        }
        let createdTask = await Task.create({
          date:new Date(postData.date),
          taskName: postData.taskName,
          priority: postData.priority,
          assignedTo: postData.assignee,
          assignedBy:req.user.id,
          deadline: new Date(postData.deadline),
          status: postData.status,
          comments: postData.comments
        })
        if(!createdTask) {
          let message = HelperService.toastrMessageError('Task not created!')
          req.flash('errorMsg', message);
          res.redirect('back');
          return;
        }
        let message =HelperService.toastrMessageSuccess('Task created!')
        req.flash('message', message);
        return res.redirect('/admin/taskList');
       /* let message =HelperService.toastrMessageSuccess('Task created!')
        req.flash('message', message);
        return res.redirect('/viewTask/'+createdTask.id)
   */   }
    } catch (err) {
	    console.log('Error   :',err);
      return res.view('500')
    }
  },
  taskList:async function(req,res) {
	  try {
	    console.log('taskList')
      console.log('userList')
      let taskList = await Task.find().populate('assignedTo')
      return res.view('admin/tasks',{layout:HelperService.getLayout(req.user.role),taskList});

    } catch (err) {
	    console.log('Error  :',err);
	    return res.view('500')
    }
  }
};

