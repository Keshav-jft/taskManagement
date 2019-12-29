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
        let message = "Task created!"
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
        let date = moment(postData.date,'DD-MM-YYYY').format('YYYY-MM-DD HH:mm:ss')
        let deadLine= moment(postData.deadline,'DD-MM-YYYY').format('YYYY-MM-DD HH:mm:ss')

         let data ={
           date:date,
           taskName: postData.taskName,
           priority: postData.priority,
           assignedTo: postData.assignee,
           assignedBy:req.user.id,
           deadline: deadLine,
           status: postData.status,
           comments: postData.comments
         };

        if(!postData.taskId) {
            createdTask = await Task.create(data);
        } else {
          createdTask = await Task.update({id:postData.taskId},data);
          createdTask = createdTask[0]
          message ="Task updated!"
        }
        if(!createdTask) {
          message = HelperService.toastrMessageError('Task not created!')
          req.flash('errorMsg', message);
          res.redirect('back');
          return;
        }
        message =HelperService.toastrMessageSuccess(message);
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
      let commentData = [];
      let task = await Task.findOne({id:postData.taskId}).populate(['assignedTo','comment']);
      let comments = task.comment.length ? task.comment :[];

      if(comments.length){
        for(let temp of comments){
         let user = await User.findOne({id:temp.user});
         if(user){
           commentData.push({createdAt:temp.createdAt,description:temp.description,userName: (user.firstName ||'')+" "+(user.lastName || ''),commentId:temp.id});
         }
        }
      }

      if(!task) {
        return res.view('404')
      }
      return res.view('admin/task',{layout:HelperService.getLayout(req.user.role),task,commentData:commentData})

    } catch (err) {
      console.log('Error   :',err);
      return res.view('500')
    }
  },
  addComment:async function(req,res){
    try {
      let {taskId, comment} = req.body;

      if (!taskId) {
        return res.send({message: 'Missing Task Id', status: false});
      }
      if (!comment) {
        return res.send({message: 'Comment filed cannot be empty', status: false});
      }
      let commentData = await Comment.create({task: taskId, description: comment, user: req.user.id});
      if (!commentData) {
        return res.send({message: 'Something went wrong, Comment cannot added', status: false});
      }
      commentData.userName = (req.user.firstName ||"")+" "+(req.user.lastName ||"");
      commentData.createdAt = commentData.createdAt ? moment(commentData.createdAt).format('DD MMM YYYY'):'';
      return res.send({message: 'Comment has been successfully added', status: true, commentData: commentData});

    }catch(e){
      return res.send({message: 'error... '+e.message, status: false});
    }
  }
};

