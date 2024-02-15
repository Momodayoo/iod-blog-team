const request = require('supertest');
const app = require('../../../app');

// Import the postRoutes module
const postRoutes = require('../../postRoutes');

// Add the postRoutes middleware to the app
app.use('/api/posts', postRoutes);

beforeAll(async () => {
  console.log("Post routes tests starting!");
});

afterAll(async () => {
  console.log("Post routes tests completed!");
});

describe('GET /api/posts', () => {
  it('should return all posts', async () => {
    const res = await request(app).get('/api/posts');
    expect(res.statusCode).toEqual(200);
  });
});

describe('GET /api/posts/:id', () => {
  it('should return a single post', async () => {
    const res = await request(app).get('/api/posts/1');
    expect(res.statusCode).toEqual(200);
  });
  it('should return a 404 if post is not found', async () => {
    const res = await request(app).get('/api/posts/999');
    expect(res.statusCode).toEqual(404);
  });
  it('should return a 422 if id is not a number', async () => {
    const res = await request(app).get('/api/posts/abc');
    expect(res.statusCode).toEqual(422);
  });
});

// add test for get post by id include
describe('GET /api/posts/:id/include', () => {
  it('should return a single post with user and comments', async () => {
    const res = await request(app).get('/api/posts/1/include');
    expect(res.statusCode).toEqual(200);
  });
  it('should return a 404 if post is not found', async () => {
    const res = await request(app).get('/api/posts/999/include');
    expect(res.statusCode).toEqual(404);
  });
  it('should return a 422 if id is not a number', async () => {
    const res = await request(app).get('/api/posts/abc/include');
    expect(res.statusCode).toEqual(422);
  });
});

// add test for getPostsByUser
describe('GET /api/posts/users/:id', () => {
  it('should return all posts by a user', async () => {
    const res = await request(app).get('/api/posts/user/1');
    expect(res.statusCode).toEqual(200);
  });
  it('should return a 422 if id is not a number', async () => {
    const res = await request(app).get('/api/posts/user/abc');
    expect(res.statusCode).toEqual(422);
  });
});

describe('POST /api/posts', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/api/posts')
      .send({
        title: "Test Post",
        content: "This is a test post",
        userId: 1
      });
    expect(res.statusCode).toEqual(200);
  });
  it('should return a 422 if title is missing', async () => {
    const res = await request(app)
      .post('/api/posts')
      .send({
        content: "This is a test post",
        userId: 1
      });
    expect(res.statusCode).toEqual(422);
  });
  it('should return a 422 if content is missing', async () => {
    const res = await request(app)
      .post('/api/posts')
      .send({
        title: "Test Post",
        userId: 1
      });
    expect(res.statusCode).toEqual(422);
  });
  it('should return a 422 if userId is missing', async () => {
    const res = await request(app)
      .post('/api/posts')
      .send({
        title: "Test Post",
        body: "This is a test post"
      });
    expect(res.statusCode).toEqual(422);
  });
});

describe('PUT /api/posts/:id', () => {
  it('should update a post', async () => {
    const res = await request(app)
      .put('/api/posts/1')
      .send({
        title: "Test Post",
        content: "This is a test post",
        userId: 1
      });
    expect(res.statusCode).toEqual(200);
  });
  it('should return a 422 if title is missing', async () => {
    const res = await request(app)
      .put('/api/posts/1')
      .send({
        content: "This is a test post",
        userId: 1
      });
    expect(res.statusCode).toEqual(422);
  });
  it('should return a 422 if content is missing', async () => {
    const res = await request(app)
      .put('/api/posts/1')
      .send({
        title: "Test Post",
        userId: 1
      });
    expect(res.statusCode).toEqual(422);
  });
  it('should return a 422 if userId is missing', async () => {
    const res = await request(app)
      .put('/api/posts/1')
      .send({
        title: "Test Post",
        body: "This is a test post"
      });
    expect(res.statusCode).toEqual(422);
  });
});

describe('DELETE /api/posts/:id', () => {
  it('should delete a post', async () => {
    const res = await request(app).delete('/api/posts/2');
    expect(res.statusCode).toEqual(200);
  });
  it('should return a 404 if post is not found', async () => {
    const res = await request(app).delete('/api/posts/999');
    expect(res.statusCode).toEqual(404);
  });
  it('should return a 422 if id is not a number', async () => {
    const res = await request(app).delete('/api/posts/abc');
    expect(res.statusCode).toEqual(422);
  });
});
