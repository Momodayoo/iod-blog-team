const dotenv = require("dotenv");
dotenv.config({ path: ".env.test" });
const { faker } = require("@faker-js/faker");
const db = require("../db");
const models = require("../models");

module.exports = async function (globalConfig, projectConfig) {
  console.log("Global setup starting!");
  await db.Sequelize.authenticate();
  await models.init();

  await db.Sequelize.models.User.create({
    name: "Test User",
    email: faker.internet.email(),
    password: "password",
  });

  await db.Sequelize.models.User.create({
    name: "Test User 2",
    email: faker.internet.email(),
    password: "password",
  });

  await db.Sequelize.models.Post.create({
    title: "Test Post",
    content: "Test Post Body",
    userId: 1,
  });

  await db.Sequelize.models.Post.create({
    title: "Test Post 2",
    content: "Test Post Body 2",
    userId: 1,
  });

  await db.Sequelize.models.Comment.create({
    content: "Test Comment Body",
    userId: 1,
    postId: 1,
  });

  await db.Sequelize.models.Comment.create({
    content: "Test Comment Body 2",
    userId: 1,
    postId: 1,
  });

  await db.Sequelize.models.Like.create({
    userId: 1,
    postId: 1,
  });

  await db.Sequelize.models.Like.create({
    userId: 1,
    postId: 1,
  });

  console.log("Global setup finished - tests starting!");

  const testDb = db;

  // Set reference to db in order to close the server during teardown.
  globalThis.__Blogdb__ = testDb;
};
