const app = require("../../../app");
const request = require("supertest");
const { faker } = require("@faker-js/faker");
const commentController = require("../../../controllers/commentController");
const commentRoutes = require("../../commentRoutes");

app.use("/api/comments", commentRoutes);

describe("Comment Routes", () => {
  describe("GET /api/comments", () => {
    it("should return all comments", async () => {
      const getCommentsMock = jest.spyOn(commentController, "getComments");
      getCommentsMock.mockResolvedValueOnce([
        {
          id: 1,
          comment: "John Doe",
          postId: 1,
        },
      ]);

      const res = await request(app).get("/api/comments");

      expect(res.statusCode).toEqual(200);

      getCommentsMock.mockRestore();
    });
  });

  describe("GET /api/comments/:id", () => {
    it("should return a comment by ID", async () => {
      const getCommentMock = jest.spyOn(commentController, "getComment");
      getCommentMock.mockResolvedValueOnce({
        id: 1,
        comment: "John Doe",
        postId: 1,
      });

      const res = await request(app).get("/api/comments/1");

      expect(res.statusCode).toEqual(200);
      expect(res.body.data.id).toEqual(1);
      expect(res.body.data.comment).toEqual("John Doe");

      getCommentMock.mockRestore();
    });

    it("should return 404 if comment not found", async () => {
      const getCommentMock = jest.spyOn(commentController, "getComment");
      getCommentMock.mockResolvedValueOnce(null);

      const res = await request(app).get("/api/comments/999");

      expect(res.statusCode).toEqual(404);

      getCommentMock.mockRestore();
    });

    it("should return 422 if validation error", async () => {
      const getCommentMock = jest.spyOn(commentController, "getComment");
      getCommentMock.mockResolvedValueOnce(null);

      const res = await request(app).get("/api/comments/abc");

      expect(res.statusCode).toEqual(422);

      getCommentMock.mockRestore();
    });
  });

  describe("POST /api/comments", () => {
    it("should create a comment", async () => {
      const createCommentMock = jest.spyOn(commentController, "createComment");
      createCommentMock.mockResolvedValueOnce({
        userId: 1,
        content: "John Doe",
        postId: 1,
      });

      const res = await request(app).post("/api/comments").send({
        userId: 1,
        content: "John Doe",
        postId: 1,
      });

      expect(res.statusCode).toEqual(200);

      createCommentMock.mockRestore();
    });

    it("should return 422 if validation error", async () => {
      const res = await request(app).post("/api/comments").send({
        postId: 1,
        comment: "John Doe",
      });

      expect(res.statusCode).toEqual(422);
    });
  });

  describe("PUT /api/comments/:id", () => {
    it("should update a comment", async () => {
      const updateCommentMock = jest.spyOn(commentController, "updateComment");
      updateCommentMock.mockResolvedValueOnce({
        userId: 1,
        content: "John Doe",
        postId: 1,
      });

      const res = await request(app).put("/api/comments/1").send({
        userId: 1,
        content: "John Doe",
        postId: 1,
      });

      expect(res.statusCode).toEqual(200);

      updateCommentMock.mockRestore();
    });

    it("should return 422 if validation error", async () => {
      const res = await request(app).put("/api/comments/1").send({
        userId: 1,
        content: "John Doe",
      });

      expect(res.statusCode).toEqual(422);
    });

    it("should return 422 if validation error", async () => {
      const res = await request(app).put("/api/comments/1").send({
        userId: 1,
        postId: 1,
      });

      expect(res.statusCode).toEqual(422);
    });
  });

  describe("DELETE /api/comments/:id", () => {
    it("should delete a comment by ID", async () => {
      const deleteCommentMock = jest.spyOn(commentController, "deleteComment");
      deleteCommentMock.mockResolvedValueOnce(1);

      const res = await request(app).delete("/api/comments/1");

      expect(res.statusCode).toEqual(200);

      deleteCommentMock.mockRestore();
    });

    it("should return 404 if comment not found", async () => {
      const deleteCommentMock = jest.spyOn(commentController, "deleteComment");
      deleteCommentMock.mockResolvedValueOnce(0);

      const res = await request(app).delete("/api/comments/999");

      expect(res.statusCode).toEqual(404);

      deleteCommentMock.mockRestore();
    });

    it("should return 422 if validation error", async () => {
      const deleteCommentMock = jest.spyOn(commentController, "deleteComment");
      deleteCommentMock.mockResolvedValueOnce(0);

      const res = await request(app).delete("/api/comments/abc");

      expect(res.statusCode).toEqual(422);

      deleteCommentMock.mockRestore();
    });
  });

  describe("GET /api/comments/posts/:id", () => {
    it("should return all comments for a post", async () => {
      const getCommentsByPostMock = jest.spyOn(
        commentController,
        "getCommentsByPost"
      );
      getCommentsByPostMock.mockResolvedValueOnce([
        {
          userId: 1,
          content: "John Doe",
          postId: 1,
        },
      ]);

      const res = await request(app).get("/api/comments/post/1");

      expect(res.statusCode).toEqual(200);

      getCommentsByPostMock.mockRestore();
    });

    it("should return 404 if post not found", async () => {
      const getCommentsByPostMock = jest.spyOn(
        commentController,
        "getCommentsByPost"
      );
      getCommentsByPostMock.mockResolvedValueOnce(null);

      const res = await request(app).get("/api/comments/post/999");

      expect(res.statusCode).toEqual(404);

      getCommentsByPostMock.mockRestore();
    });

    it("should return 422 if validation error", async () => {
      const getCommentsByPostMock = jest.spyOn(
        commentController,
        "getCommentsByPost"
      );
      getCommentsByPostMock.mockResolvedValueOnce(null);

      const res = await request(app).get("/api/comments/post/abc");

      expect(res.statusCode).toEqual(422);

      getCommentsByPostMock.mockRestore();
    });
  });

  describe("GET /api/comments/users/:id", () => {
    it("should return all comments for a user", async () => {
      const getCommentsByUserMock = jest.spyOn(
        commentController,
        "getCommentsByUser"
      );
      getCommentsByUserMock.mockResolvedValueOnce([
        {
          userId: 1,
          content: "John Doe",
          postId: 1,
        },
      ]);

      const res = await request(app).get("/api/comments/user/1");

      expect(res.statusCode).toEqual(200);

      getCommentsByUserMock.mockRestore();
    });

    it("should return 404 if user not found", async () => {
      const getCommentsByUserMock = jest.spyOn(
        commentController,
        "getCommentsByUser"
      );
      getCommentsByUserMock.mockResolvedValueOnce(null);

      const res = await request(app).get("/api/comments/user/999");

      expect(res.statusCode).toEqual(404);

      getCommentsByUserMock.mockRestore();
    });

    it("should return 422 if validation error", async () => {
      const getCommentsByUserMock = jest.spyOn(
        commentController,
        "getCommentsByUser"
      );
      getCommentsByUserMock.mockResolvedValueOnce(null);

      const res = await request(app).get("/api/comments/user/abc");

      expect(res.statusCode).toEqual(422);

      getCommentsByUserMock.mockRestore();
    });
  });
});
