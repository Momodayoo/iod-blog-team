const app = require("../../../app");
const request = require("supertest");
const { faker } = require("@faker-js/faker");
const postController = require("../../../controllers/postController");
const postRoutes = require("../../postRoutes");

app.use("/api/posts", postRoutes);

describe("Post Routes", () => {
  describe("GET /api/posts", () => {
    it("should return all posts", async () => {
      const getPostsMock = jest.spyOn(postController, "getPosts");
      getPostsMock.mockResolvedValueOnce([
        {
          id: 1,
          name: "John Doe",
          password: "password",
          email: "john@dudes.com",
        },
      ]);

      const res = await request(app).get("/api/posts");

      expect(res.statusCode).toEqual(200);

      getPostsMock.mockRestore();
    });
  });

  describe("GET /api/posts/:id", () => {
    it("should return a post by ID", async () => {
      const getPostMock = jest.spyOn(postController, "getPost");
      getPostMock.mockResolvedValueOnce({
        id: 1,
        name: "John Doe",
        password: "password",
        email: faker.internet.email(),
      });

      const res = await request(app).get("/api/posts/1");

      expect(res.statusCode).toEqual(200);
      expect(res.body.data.id).toEqual(1);
      expect(res.body.data.name).toEqual("John Doe");
    });

    it("should return 404 if post not found", async () => {
      const getPostMock = jest.spyOn(postController, "getPost");
      getPostMock.mockResolvedValueOnce(null);

      const res = await request(app).get("/api/posts/999");

      expect(res.statusCode).toEqual(404);

      getPostMock.mockRestore();
    });

    it("should return 422 if validation error", async () => {
      const getPostMock = jest.spyOn(postController, "getPost");
      getPostMock.mockResolvedValueOnce(null);

      const res = await request(app).get("/api/posts/invalid");

      expect(res.statusCode).toEqual(422);

      getPostMock.mockRestore();
    });
  });

  describe("POST /api/posts", () => {
    it("should create a new post", async () => {
      const createPostMock = jest.spyOn(postController, "createPost");
      createPostMock.mockResolvedValueOnce({
        id: 1,
        content: "Hello World",
        userId: 1,
        title: "A simple post",
      });

      const res = await request(app).post("/api/posts").send({
        id: 1,
        content: "Hello World",
        userId: 1,
        title: "A simple post",
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body.data.id).toEqual(1);

      createPostMock.mockRestore();
    });

    it("should return 422 if validation error", async () => {
      const res = await request(app).post("/api/posts").send({
        id: 1,
        content: "",
        userId: 1,
        title: "A simple post",
      });

      expect(res.statusCode).toEqual(422);
    });

    it("should return 422 if validation error", async () => {
      const res = await request(app).post("/api/posts").send({
        id: 1,
        content: "Hello World",
        userId: 1,
        title: "",
      });

      expect(res.statusCode).toEqual(422);
    });

    it("should return 422 if validation error", async () => {
      const res = await request(app).post("/api/posts").send({
        title: "test post",
        content: "content here",
        userId: null,
      });

        expect(res.statusCode).toEqual(422);
    });

  });

    describe("PUT /api/posts/:id", () => {
        it("should update a post", async () => {
        const updatePostMock = jest.spyOn(postController, "updatePost");
        updatePostMock.mockResolvedValueOnce({
            id: 1,
            content: "Hello World",
            userId: 1,
            title: "A simple post",
        });
    
        const res = await request(app).put("/api/posts/1").send({
            id: 1,
            content: "Hello World",
            userId: 1,
            title: "A simple post",
        });
    
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.id).toEqual(1);
    
        updatePostMock.mockRestore();
        });
    
        it("should return 422 if validation error", async () => {
        const res = await request(app).put("/api/posts/1").send({
            id: 1,
            content: "",
            userId: 1,
            title: "A simple post",
        });
    
        expect(res.statusCode).toEqual(422);
        });
    
        it("should return 422 if validation error", async () => {
        const res = await request(app).put("/api/posts/1").send({
            id: 1,
            content: "Hello World",
            userId: 1,
            title: "",
        });
    
        expect(res.statusCode).toEqual(422);
        });
    
        it("should return 422 if validation error", async () => {
        const res = await request(app).put("/api/posts/1").send({
            title: "test post",
            content: "content here",
            userId: null,
        });
    
            expect(res.statusCode).toEqual(422);
        });
    
    });

    describe("DELETE /api/posts/:id", () => {
        it("should delete a post", async () => {
        const deletePostMock = jest.spyOn(postController, "deletePost");
        deletePostMock.mockResolvedValueOnce({
            id: 1,
            content: "Hello World",
            userId: 1,
            title: "A simple post",
        });
    
        const res = await request(app).delete("/api/posts/1").send({
            id: 1,
            content: "Hello World",
            userId: 1,
            title: "A simple post",
        });
    
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.id).toEqual(1);
    
        deletePostMock.mockRestore();
        });

        // 404 error
        it("should return 404 if post not found", async () => {
            const deletePostMock = jest.spyOn(postController, "deletePost");
            deletePostMock.mockResolvedValueOnce(null);
      
            const res = await request(app).delete("/api/posts/999");
      
            expect(res.statusCode).toEqual(404);
      
            deletePostMock.mockRestore();
          });
    
        it("should return 422 if validation error", async () => {
        const res = await request(app).delete("/api/posts/invalid").send({
            id: 1,
            content: "",
            userId: 1,
            title: "A simple post",
        });
    
        expect(res.statusCode).toEqual(422);
        });
    
    });
});
