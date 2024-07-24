const fp = require('fastify-plugin')
async function authPlugin(fastify, options) {
    
    fastify.decorate('authenticate', async function (request, reply) {
      
      const authHeader = request.headers.Authorization;
  
      if (!authHeader) {
        reply.code(401).send({ error: 'Unauthorized' });
        return;
      }
  
      const token = authHeader.split(' ')[1];
      if (token !== 'valid-token') {
        reply.code(401).send({ error: 'Invalid token' });
        return;
      }
  
    });
  }
  
  module.exports = fp(authPlugin) ;
  
