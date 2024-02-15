const request = require('supertest');
const app = require('../../app');

beforeAll(() => {
  console.log('App test starting!');
});

afterAll(() => {
  console.log('App test completed!');
});

describe('GET /', () => {
  it('should return welcome message', async () => {
    const res = await request(app)
      .get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toEqual('Welcome to my Blog application.');
  });
});