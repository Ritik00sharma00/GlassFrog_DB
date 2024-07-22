
const taskController = require('../../controller/taskcontroller');

async function taskRoutes(fastify, options) {
  fastify.post('/tasks', { preHandler: [fastify.authenticate] }, taskController.createTask);
  fastify.get('/tasks', { preHandler: [fastify.authenticate] }, taskController.getTasks); 
  fastify.put('/tasks/:taskId/:user_Id', { preHandler: [fastify.authenticate] }, taskController.updateTask);
  fastify.delete('/tasks/:taskId/:user_Id', { preHandler: [fastify.authenticate] }, taskController.deleteTask);
}

module.exports = taskRoutes;
