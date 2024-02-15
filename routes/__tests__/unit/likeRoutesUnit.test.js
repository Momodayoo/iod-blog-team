const app = require("../../../app");
const request = require("supertest");
const { faker } = require("@faker-js/faker");
const likeController = require("../../../controllers/likeController");
const likeRoutes = require("../../likeRoutes");

app.use("/api/likes", likeRoutes);

describe("Like Routes", () => {
  describe("GET /api/likes", () => {
    it("should return all likes", async () => {
      const getLikesMock = jest.spyOn(likeController, "getLikes");
      getLikesMock.mockResolvedValueOnce([
        {
          id: 1,
          name: "John Doe",
          password: "password",
          email: "john@test.com",
        },
      ]);

      const res = await request(app).get("/api/likes");

      expect(res.statusCode).toEqual(200);

      getLikesMock.mockRestore();
    });
  });

  describe("GET /api/likes/:id", () => {
    it("should return a like by ID", async () => {
      const getLikeMock = jest.spyOn(likeController, "getLike");
      getLikeMock.mockResolvedValueOnce({
        id: 1,
        name: "John Doe",
        password: "password",
        email: faker.internet.email(),
      });

      const res = await request(app).get("/api/likes/1");

      expect(res.statusCode).toEqual(200);
      expect(res.body.data.id).toEqual(1);
      expect(res.body.data.name).toEqual("John Doe");
    });

    it("should return 404 if like not found", async () => {
      const getLikeMock = jest.spyOn(likeController, "getLike");
      getLikeMock.mockResolvedValueOnce(null);

      const res = await request(app).get("/api/likes/999");

      expect(res.statusCode).toEqual(404);

      getLikeMock.mockRestore();
    });

    it("should return 422 if validation error", async () => {
      const getLikeMock = jest.spyOn(likeController, "getLike");
      getLikeMock.mockResolvedValueOnce(null);

      const res = await request(app).get("/api/likes/abc");

      expect(res.statusCode).toEqual(422);

      getLikeMock.mockRestore();
    });
  });

  describe("GET /api/likes/include/:id", () => {
    // tests for '/include/:id' route
    it("should return a like by ID with post and user", async () => {
      const getLikeMock = jest.spyOn(likeController, "getLikeIncludeAll");
      getLikeMock.mockResolvedValueOnce({
        id: 1,
        postId: 1,
        userId: 1,
      });

      const res = await request(app).get("/api/likes/include/1");

      expect(res.statusCode).toEqual(200);
      expect(res.body.data.id).toEqual(1);
      expect(res.body.data.postId).toEqual(1);
      expect(res.body.data.userId).toEqual(1);
    });

    it("should return 404 if like not found", async () => {
      const getLikeMock = jest.spyOn(likeController, "getLikeIncludeAll");
      getLikeMock.mockResolvedValueOnce(null);

      const res = await request(app).get("/api/likes/include/999");

      expect(res.statusCode).toEqual(404);

      getLikeMock.mockRestore();
    });

    it("should return 422 if validation error", async () => {
      const getLikeMock = jest.spyOn(likeController, "getLikeIncludeAll");
      getLikeMock.mockResolvedValueOnce(null);

      const res = await request(app).get("/api/likes/include/abc");

      expect(res.statusCode).toEqual(422);

      getLikeMock.mockRestore();
    });
  });

  // get likes by post id
  describe("GET /api/likes/post/:id", () => {
    it("should return likes by post ID", async () => {
      const getLikesByPostIdMock = jest.spyOn(likeController, "getLikesByPost");
      getLikesByPostIdMock.mockResolvedValueOnce([
        {
          id: 1,
          postId: 1,
          userId: 1,
        },
      ]);

      const res = await request(app).get("/api/likes/post/1");

      expect(res.statusCode).toEqual(200);

      getLikesByPostIdMock.mockRestore();
    });

    it("should return 422 if validation error", async () => {
      const getLikesByPostIdMock = jest.spyOn(likeController, "getLikesByPost");
      getLikesByPostIdMock.mockResolvedValueOnce([]);

      const res = await request(app).get("/api/likes/post/abc");

      expect(res.statusCode).toEqual(422);

      getLikesByPostIdMock.mockRestore();
    });
  });

  // get likes by user id
  describe("GET /api/likes/user/:id", () => {
    it("should return likes by user ID", async () => {
      const getLikesByUserIdMock = jest.spyOn(likeController, "getLikesByUser");
      getLikesByUserIdMock.mockResolvedValueOnce([
        {
          id: 1,
          postId: 1,
          userId: 1,
        },
      ]);

      const res = await request(app).get("/api/likes/user/1");

      expect(res.statusCode).toEqual(200);

      getLikesByUserIdMock.mockRestore();
    });

    it("should return 422 if validation error", async () => {
      const getLikesByUserIdMock = jest.spyOn(likeController, "getLikesByUser");
      getLikesByUserIdMock.mockResolvedValueOnce([]);

      const res = await request(app).get("/api/likes/user/abc");

      expect(res.statusCode).toEqual(422);

      getLikesByUserIdMock.mockRestore();
    });
  });

  describe("POST /api/likes", () => {
    it("should create a new like", async () => {
      const createLikeMock = jest.spyOn(likeController, "createLike");
      createLikeMock.mockResolvedValueOnce({
        id: 1,
        name: "John Doe",
        password: "password",
        email: faker.internet.email(),
      });

      const res = await request(app).post("/api/likes").send({
        userId: 1,
        postId: 1,
      });

      expect(res.statusCode).toEqual(201);
      expect(res.body.data.id).toEqual(1);
      expect(res.body.data.name).toEqual("John Doe");

      createLikeMock.mockRestore();
    });

    it("should return 422 if validation error", async () => {
      const res = await request(app).post("/api/likes").send({
        userId: "abc",
        postId: "abc",
      });

      expect(res.statusCode).toEqual(422);
    });
  });

  describe("PUT /api/likes/:id", () => {
    it("should update a like by ID", async () => {
      const updateLikeMock = jest.spyOn(likeController, "updateLike");
      updateLikeMock.mockResolvedValueOnce([
        1,
        [
          {
            id: 1,
            userId: 1,
            postId: 1,
          },
        ],
      ]);

      const res = await request(app).put("/api/likes/1").send({
        id: 1,
        userId: 1,
        postId: 1,
      });

      expect(res.statusCode).toEqual(200);
    });

    it("should return 404 if like not found", async () => {
      const updateLikeMock = jest.spyOn(likeController, "updateLike");
      updateLikeMock.mockResolvedValueOnce([0, []]);

      const res = await request(app).put("/api/likes/999").send({
        id: 999,
        userId: 1,
        postId: 1,
      });

      expect(res.statusCode).toEqual(404);

      updateLikeMock.mockRestore();
    });

    it("should return 422 if validation error", async () => {
      const updateLikeMock = jest.spyOn(likeController, "updateLike");
      updateLikeMock.mockResolvedValueOnce([0, []]);

      const res = await request(app).put("/api/likes/abc").send({
        id: "abc",
        userId: 1,
        postId: 1,
      });

      expect(res.statusCode).toEqual(422);

      updateLikeMock.mockRestore();
    });
  });


  describe("DELETE /api/likes/:id", () => {
    it("should delete a like by ID", async () => {
      const deleteLikeMock = jest.spyOn(likeController, "deleteLike");
      deleteLikeMock.mockResolvedValueOnce(1);

      const res = await request(app).delete("/api/likes/1");

      expect(res.statusCode).toEqual(200);

      deleteLikeMock.mockRestore();
    });

    it("should return 404 if like not found", async () => {
      const deleteLikeMock = jest.spyOn(likeController, "deleteLike");
      deleteLikeMock.mockResolvedValueOnce(0);

      const res = await request(app).delete("/api/likes/999");

      expect(res.statusCode).toEqual(404);

      deleteLikeMock.mockRestore();
    });

    it("should return 422 if validation error", async () => {
      const deleteLikeMock = jest.spyOn(likeController, "deleteLike");
      deleteLikeMock.mockResolvedValueOnce(0);

      const res = await request(app).delete("/api/likes/abc");

      expect(res.statusCode).toEqual(422);

      deleteLikeMock.mockRestore();
    });
  });
});
