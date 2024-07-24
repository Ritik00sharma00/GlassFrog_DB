const Task = require('../model/tasksmodel');
const User = require('../model/usermodel');


const createTask = async (req, reply) => {

  const {
    user_Id,
    title,
    description,
    dueDate,
    status
  } = req.body;

  try {

    //  const user_Id = await getUserIdByUsername(username); 

    const userTasks = await Task.findOne({
      user_Id
    });

    let newTask;
    // console.log(newTask);
    if (!userTasks) {
      newTask = new Task({
        user_Id,
        tasks: [{
          title: title,
          description: description,
          dueDate: dueDate,
          status: status
        }]
      });
      await newTask.save();
      reply.code(201).send({
        message: "Task created successfully",
        task: newTask
      });
    } else {
      console.log("else part")
      console.log(newTask);
      newTask = {

        title: title,
        description: description,
        dueDate: dueDate,
        status: status

      }
      userTasks.tasks.push(newTask);
      await userTasks.save();
      reply.code(201).send({
        message: "Task added successfully",
        task: userTasks
      });
    }

  } catch (err) {
    reply.code(500).send({
      error: err.message
    });
  }
};




//this controller is to  fetch tasks  of a particulart user .
async function getTasks(req, reply) {
  const {
    user_Id
  } = req.params;
  try {
    const userTasks = await Task.findOne({
      user_Id
    });
    if (!userTasks) {
      return reply.code(404).send({
        error: "No tasks found for this user"
      });
    }
    reply.send({
      tasks: userTasks.tasks
    });
  } catch (err) {
    reply.code(500).send({
      error: "Error fetching tasks"
    });
  }
}


//this controller is to update the task from the user
async function updateTask(req, reply) {
  const {
    user_Id,
    taskId
  } = req.params;
  const updateData = req.body;

  try {
    const userTasks = await Task.findOne({
      user_Id,
      tasks: { $elemMatch: { _id: taskId } } 
    });

    if (!userTasks) {
      return reply.code(404).send({
        error: "User not found"
      });
    }

    const task = userTasks.tasks.id(taskId);

    if (!task) {
      return reply.code(404).send({
        error: "Task not found"
      });
    }

    Object.assign(task, updateData);
    await userTasks.save();

    reply.send({
      message: "Task updated successfully",
      task: task
    });
  } catch (err) {
    reply.code(500).send({
      error: "Error updating task"
    });
  }
}



// this controlleer is usedd to delet the task from teh user.


  async function deleteTask ( req,reply)  {

    const {user_Id, taskId}=req.params; 
  try {
    const result = await Task.updateOne(
      { user_Id, 'tasks._id': taskId }, // Find the document and task to delete
      { $pull: { tasks: { _id: taskId } } } // Remove the task with the specified _id
    );

    if (result.matchedCount === 0) {
      console.log('No matching document found.');
    } else if (result.modifiedCount === 0) {
      console.log('Task not found or already deleted.');
    } else {
      console.log('Task deleted successfully.');
    }
  } catch (err) {
    console.error('Error deleting task:', err);
  }
};

module.exports = {

  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
