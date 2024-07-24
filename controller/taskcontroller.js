const Task = require('../model/tasksmodel');
const User = require('../model/usermodel');


const createTask = async (req, reply) => {
  const user_Id = req.params.userId;  // Assuming userId is passed as a URL parameter
  const { title, description, dueDate, status } = req.body;

  try {
    // Find user’s tasks by user_Id
    let userTasks = await Task.findOne({ user_Id });  // Changed to findOne

    if (!userTasks) {
      // If no tasks exist for the user, create a new task list
      userTasks = new Task({
        user_Id,
        tasks: [{
          title,
          description,
          dueDate,
          status
        }]
      });
      await userTasks.save();
      reply.code(201).send({
        message: "Task created successfully",
        task: userTasks
      });
    } else {
      // If tasks exist, add the new task to the existing list
      userTasks.tasks.push({
        title,
        description,
        dueDate,
        status
      });
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
const user_Id  = req.params;

  try {
    const tasks = await Task.find({ user_Id:user_Id});
    
      reply.code(200).send(tasks);
    
  } catch (error) {
    console.error('Error fetching tasks:', error);
    reply.code(500).send({ error: 'Failed to fetch tasks' });
  }}


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
