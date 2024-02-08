require("dotenv").config();
const express = require("express");
const cors = require('cors');
const handlebars = require('express-handlebars');
const { handleInvalidJson, handleUnauthorized, handleNotFound, handleAllOtherErrors } = require("./errors/errorHandler");
const morganMiddleware = require("./logging/morganMiddleware");
const Logger = require("./logging/logger");

// Database
const db = require("./db");
// create tables
const models = require("./models");
models.init();

const app = express();

app.set('view engine', 'hbs');

app.engine('hbs', handlebars.engine({
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials',
  defaultLayout: 'main',
  extname: 'hbs'
}));

app.use(express.json());
//Serves static files (we need it to import a css file)
app.use(express.static('public'));

app.use(morganMiddleware);

app.use(cors());
// cross origin resource sharing back end on 3000, front end 8080

// Swagger
if (process.env.NODE_ENV === 'development') {
  const swaggerUi = require('swagger-ui-express');
  const swaggerSpec = require('./swagger/swaggerSpec');
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec.default));
}

// // Routes
app.use("/api/users", require("./routes/userRoutes"));
// add post routes
app.use("/api/posts", require("./routes/postRoutes"));
// add comment routes
app.use("/api/comments", require("./routes/commentRoutes"));
// add like routes
app.use("/api/likes", require("./routes/likeRoutes"));

// link for pages in views//

app.get("/", (req, res) => {
  res.render('main', {layout : 'index'});
});

app.get("/login", (req, res) => {
  res.render('login', {layout : 'index'});
});

app.get("/users", (req, res) => {
  res.render('users', {layout : 'index'});
});

app.get("/users-add", (req, res) => {
  res.render('users-add', {layout : 'index'});
});

// swagger API//
app.get("/api-docs", async (req, res) => {
  const users = await userController.getUsers();
  console.log(users);
  res.render('users', {layout : 'index', users: users});
});

// Add error handler middleware functions to the pipeline
app.use(handleInvalidJson);
app.use(handleUnauthorized);
app.use(handleNotFound);
app.use(handleAllOtherErrors);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  Logger.debug(`Example app listening on port ${port}!`);
});