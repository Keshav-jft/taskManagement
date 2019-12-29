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
        let task =  await Task.findOne({id:req.query.taskId}).populate('assignedTo');

        return res.view('admin/addTask',{layout:HelperService.getLayout(req.user.role),assignees,taskData:task || {}});
      }else {
        let postData = req.allParams();
        console.log('postData',postData)
        if(!postData.date
          || !postData.taskName
          || !postData.priority
          || !postData.assignee
          || !postData.deadline
          || !postData.status
         ){
          let message = HelperService.toastrMessageError('all fields are mandetory')
          req.flash('errorMsg', message);
          res.redirect('back');
          return;
        }
        let createdTask = null;
        if(!postData.taskId) {
            createdTask = await Task.create({
            date:new Date(postData.date),
            taskName: postData.taskName,
            priority: postData.priority,
            assignedTo: postData.assignee,
            assignedBy:req.user.id,
            deadline: new Date(postData.deadline),
            status: postData.status,
            comments: postData.comments
          })
        } else {
          createdTask = await Task.update({id:postData.taskId},{
            date:new Date(postData.date),
            taskName: postData.taskName,
            priority: postData.priority,
            assignedTo: postData.assignee,
            assignedBy:req.user.id,
            deadline: new Date(postData.deadline),
            status: postData.status,
            comments: postData.comments
          })
          createdTask = createdTask[0]
        }
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
      let taskList = await Task.find({isDeleted:false}).populate('assignedTo')
      return res.view('admin/tasks',{layout:HelperService.getLayout(req.user.role),taskList});

    } catch (err) {
	    console.log('Error  :',err);
	    return res.view('500')
    }
  },
  deleteTask: async function(req,res){
    try {
      let taskId = req.query.taskId;
      if (!taskId) {
        return res.send({message: 'Missing task id', status: false});
      }
      let task = await Task.findOne({id: taskId});
      if (task && task.isDeleted) {
        return res.send({message: 'This task already deleted, Please refresh the page and try again', status: false});
      }
      task.isDeleted = true;
      await task.save();
      return res.send({message: 'Task has been deleted successfully', status: true});
    }catch(e){
      return res.send({message:e.message, status: false});
    }
  },
  viewTask:async function(req,res) {
    try  {
      let postData = req.allParams();
      let task = await Task.findOne({id:postData.taskId}).populate(['assignedTo']);
      if(!task) {
        return res.view('404')
      }
      return res.view('admin/task',{layout:HelperService.getLayout(req.user.role),task})

    } catch (err) {
      console.log('Error   :',err)
      return res.view('500')
    }
  }
};

