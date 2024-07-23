const fastify = require("fastify")({ logger: true });
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskroutes/taskroutes");
const authPlugin = require('./middlewares/authMiddleware');
const fastifyCors = require('fastify-cors');
require('dotenv').config();


fastify.register(fastifyCors, {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});


// Register middleware
fastify.register(authPlugin);

// Register routes with prefix
fastify.register(userRoutes, { prefix: '/api/' });
fastify.register(taskRoutes, { prefix: '/api/' });

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => {
  console.error('Failed to connect to MongoDB', err.message);
  process.exit(1); // Exit the process if the connection fails
});

// Default route
fastify.get("/", function (request, reply) {
  reply.send({ hello: "world" });
});

// Start the server
fastify.listen(process.env.PORT, '0.0.0.0', function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server is running on ${address}`);
});
