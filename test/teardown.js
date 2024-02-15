module.exports = async function (globalConfig, projectConfig) {
  await globalThis.__Blogdb__.Sequelize.drop();
  await globalThis.__Blogdb__.Sequelize.close();
};
