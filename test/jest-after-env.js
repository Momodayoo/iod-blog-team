const models = require('../models');

beforeAll(
    async () => await models.init()
);