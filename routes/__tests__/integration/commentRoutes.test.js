const request = require("supertest");
const app = require("../../../app");
const commentRoutes = require("../../commentRoutes");

app.use("/api/comments", commentRoutes);

beforeAll(async () => {
  console.log("Comment routes tests starting!");
});

afterAll(async () => {
  console.log("Comment routes tests completed!");
});

describe("GET /api/comments", () => {
  it("should return all comments", async () => {
    const res = await request(app).get("/api/comments");
    expect(res.statusCode).toEqual(200);
  });
});

describe("GET comments by post ID", () => {
  it("should return all comments by post ID", async () => {
    const id = 1;
    const res = await request(app).get(`/api/comments/post/${id}`);
    expect(res.statusCode).toEqual(200);
  });
  it("should return 422 if validation error", async () => {
    const id = "invalid";
    const res = await request(app).get(`/api/comments/post/${id}`);
    expect(res.statusCode).toEqual(422);
  });
});

describe("GET comments by user ID", () => {
  it("should return all comments by user ID", async () => {
    const id = 1;
    const res = await request(app).get(`/api/comments/user/${id}`);
    expect(res.statusCode).toEqual(200);
  });
  it("should return 422 if validation error", async () => {
    const id = "invalid";
    const res = await request(app).get(`/api/comments/user/${id}`);
    expect(res.statusCode).toEqual(422);
  });
});

describe("GET /api/comments/:id", () => {
  it("should return a comment by ID", async () => {
    const id = 1;
    const res = await request(app).get(`/api/comments/${id}`);
    expect(res.statusCode).toEqual(200);
  });
  it("should return 404 if comment not found", async () => {
    const id = 999;
    const res = await request(app).get(`/api/comments/${id}`);
    expect(res.statusCode).toEqual(404);
  });
  it("should return 422 if validation error", async () => {
    const id = "invalid";
    const res = await request(app).get(`/api/comments/${id}`);
    expect(res.statusCode).toEqual(422);
  });
});

describe("POST /api/comments", () => {
  it("should create a new comment", async () => {
    const res = await request(app).post("/api/comments").send({
        content: "test comment",
        userId: 1,
        postId: 1,
    });
    expect(res.statusCode).toEqual(200);
  });
  it("should return 422 if validation error", async () => {
    const comment = {
      content: "test comment",
      userId: 1,
      postId: "invalid",
    };
    const res = await request(app).post("/api/comments").send(comment);
    expect(res.statusCode).toEqual(422);
  });
});

describe("PUT /api/comments/:id", () => {
  it("should update a comment by ID", async () => {
    const id = 1;
    const comment = {
      content: "test comment",
      userId: 1,
      postId: 1,
    };
    const res = await request(app).put(`/api/comments/${id}`).send(comment);
    expect(res.statusCode).toEqual(200);
  });
  it("should return 422 if validation error", async () => {
    const id = 1;
    const comment = {
      content: "test comment",
      userId: 1,
      postId: "invalid",
    };
    const res = await request(app).put(`/api/comments/${id}`).send(comment);
    expect(res.statusCode).toEqual(422);
  });
});

describe("GET /:id/include", () => {
  it("should return a comment by ID with all associations", async () => {
    const id = 1;
    const res = await request(app).get(`/api/comments/${id}/include`);
    expect(res.statusCode).toEqual(200);
  });
  it("should return 404 if comment not found", async () => {
    const id = 999;
    const res = await request(app).get(`/api/comments/${id}/include`);
    expect(res.statusCode).toEqual(404);
  });
  it("should return 422 if validation error", async () => {
    const id = "invalid";
    const res = await request(app).get(`/api/comments/${id}/include`);
    expect(res.statusCode).toEqual(422);
  });
});

describe("GET '/post/:id", () => {
  it("should return all comments by post ID", async () => {
    const id = 1;
    const res = await request(app).get(`/api/comments/post/${id}`);
    expect(res.statusCode).toEqual(200);
  });
  it("should return 422 if validation error", async () => {
    const id = "invalid";
    const res = await request(app).get(`/api/comments/post/${id}`);
    expect(res.statusCode).toEqual(422);
  });
});

describe("GET '/user/:id", () => {
  it("should return all comments by user ID", async () => {
    const id = 1;
    const res = await request(app).get(`/api/comments/user/${id}`);
    expect(res.statusCode).toEqual(200);
  });
  it("should return 422 if validation error", async () => {
    const id = "invalid";
    const res = await request(app).get(`/api/comments/user/${id}`);
    expect(res.statusCode).toEqual(422);
  });
});

describe("DELETE /api/comments/:id", () => {
  it("should delete a comment by ID", async () => {
    const id = 2;
    const res = await request(app).delete(`/api/comments/${id}`);
    expect(res.statusCode).toEqual(200);
  });
  it("should return 404 if comment not found", async () => {
    const id = 999;
    const res = await request(app).delete(`/api/comments/${id}`);
    expect(res.statusCode).toEqual(404);
  });
  it("should return 422 if validation error", async () => {
    const id = "invalid";
    const res = await request(app).delete(`/api/comments/${id}`);
    expect(res.statusCode).toEqual(422);
  });
});
