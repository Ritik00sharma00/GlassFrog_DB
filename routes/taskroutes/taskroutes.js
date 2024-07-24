
const taskController = require('../../controller/taskcontroller');

async function taskRoutes(fastify, options) {
  fastify.post('/tasks/:userId', taskController.createTask);
fastify.get('/tasks/:userId', taskController.getTasks); 
  fastify.put('/tasks/:taskId/:user_Id', taskController.updateTask);
  fastify.delete('/tasks/:taskId/:user_Id', taskController.deleteTask);
}

module.exports = taskRoutes;
