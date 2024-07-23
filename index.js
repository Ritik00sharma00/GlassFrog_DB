const fastify = require("fastify")({ logger: true,});
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const  taskRoutes = require("./routes/taskroutes/taskroutes");
const authPlugin = require('./middlewares/authMiddleware');
require('dotenv').config();
fastify.register(authPlugin);


fastify.register(userRoutes,{prefix:'/api/'});
fastify.register(taskRoutes,{prefix:'/api/'});

mongoose
.connect( process.env.DATABASE_URI)
.then(() => console.log("connected"))
.catch((err) => console.log(err));

JViIyiAyH4NORHEq


fastify.get("/", function (request, reply) {
    reply.send({hello: "world"});
});



fastify.listen({port: parseInt(process.env.PORT, 10)}, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});
