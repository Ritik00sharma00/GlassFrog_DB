const usercontroller =require('../controller/usercontroller');


module.exports=async function routes (fastify, options) {
    fastify.post('/registration', usercontroller.signUp);
    fastify.post('/login', usercontroller.signIn);
  }
  