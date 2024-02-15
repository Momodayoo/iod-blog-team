const request = require("supertest");
const app = require("../../../app");
const likeController = require("../../../controllers/likeController");
const likeRoutes = require("../../likeRoutes");

// Add the postRoutes middleware to the app
app.use('/api/likes', likeRoutes);

beforeAll(async () => {
    console.log("Like routes tests starting!");
  });
  
  afterAll(async () => {
    console.log("Like routes tests completed!");
  });

describe("GET /api/likes", () => {
    it("should return all likes", async () => {
      const res = await request(app).get("/api/likes");
      const likes = await likeController.getLikes();
      expect(res.statusCode).toEqual(200);
      expect(res.body.data.length).toEqual(likes.length);
    });
  });

    describe("GET /api/likes/:id", () => {
        it("should return a like by ID", async () => {
        const id = 1; // Replace with a valid like ID
        const res = await request(app).get(`/api/likes/${id}`);
        const bob = await likeController.getLike(id);
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.id).toEqual(bob.id);
        });
    });

    it("should return 404 if like not found", async () => {
        const id = 999; // Replace with a non-existent like ID
        const res = await request(app).get(`/api/likes/${id}`);
        expect(res.statusCode).toEqual(404);
    });

    it("should return 422 if validation error", async () => {
        const id = "invalid"; // Replace with an invalid like ID
        const res = await request(app).get(`/api/likes/${id}`);
        expect(res.statusCode).toEqual(422);
    });

describe("GET /api/likes/post/:id", () => {
    it("should return all likes by post ID", async () => {
        const id = 1; // Replace with a valid post ID
        const res = await request(app).get(`/api/likes/post/${id}`);
        const bob = await likeController.getLikesByPost(id);
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.length).toEqual(bob.length);
    });
    it("should return 422 if validation error", async () => {
        const id = "invalid"; // Replace with an invalid post ID
        const res = await request(app).get(`/api/likes/post/${id}`);
        expect(res.statusCode).toEqual(422);
    });
});

describe("GET /api/likes/user/:id", () => {
    it("should return all likes by user ID", async () => {
        const id = 1; // Replace with a valid user ID
        const res = await request(app).get(`/api/likes/user/${id}`);
        const bob = await likeController.getLikesByUser(id);
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.length).toEqual(bob.length);
    });
    it("should return 422 if validation error", async () => {
        const id = "invalid"; // Replace with an invalid user ID
        const res = await request(app).get(`/api/likes/user/${id}`);
        expect(res.statusCode).toEqual(422);
    });
});

describe("POST /api/likes", () => {
    it("should create a new like", async () => {
        const res = await request(app).post("/api/likes").send({
            userId: 1,
            postId: 1,
        });
        expect(res.statusCode).toEqual(201);
    });
    it("should return 422 if validation error", async () => {
        const res = await request(app).post("/api/likes").send({
            userId: 1,
        });
        expect(res.statusCode).toEqual(422);
    });
});

describe("DELETE /api/likes/:id", () => {
    it("should delete a like by ID", async () => {
        const id = 2; // Replace with a valid like ID
        const res = await request(app).delete(`/api/likes/${id}`);
        expect(res.statusCode).toEqual(200);
    });
    it("should return 404 if like not found", async () => {
        const id = 999; // Replace with a non-existent like ID
        const res = await request(app).delete(`/api/likes/${id}`);
        expect(res.statusCode).toEqual(404);
    });
    it("should return 422 if validation error", async () => {
        const id = "invalid"; // Replace with an invalid like ID
        const res = await request(app).delete(`/api/likes/${id}`);
        expect(res.statusCode).toEqual(422);
    });
});

describe("PUT /api/likes/:id", () => {
    it("should update a like by ID", async () => {
        const id = 1; // Replace with a valid like ID
        const res = await request(app).put(`/api/likes/${id}`).send({
            userId: 1,
            postId: 1,
        });
        expect(res.statusCode).toEqual(200);
    });
    it("should return 404 if like not found", async () => {
        const id = 999; // Replace with a non-existent like ID
        const res = await request(app).put(`/api/likes/${id}`).send({
            userId: 1,
            postId: 1,
        });
        expect(res.statusCode).toEqual(404);
    });
    it("should return 422 if validation error", async () => {
        const id = "invalid"; // Replace with an invalid like ID
        const res = await request(app).put(`/api/likes/${id}`).send({
            userId: 1,
            postId: 1,
        });
        expect(res.statusCode).toEqual(422);
    });
});

describe("GET /include/:id", () => {
    it("should return a like with included user and post info", async () => {
        const id = 1; // Replace with a valid like ID
        const res = await request(app).get(`/api/likes/include/${id}`);
        expect(res.statusCode).toEqual(200);
        console.log(res.body);
        expect(res.body.data['User.id']).toEqual(1);
        expect(res.body.data['Post.id']).toEqual(1);
    });
    it("should return 404 if like not found", async () => {
        const id = 999; // Replace with a non-existent like ID
        const res = await request(app).get(`/api/likes/include/${id}`);
        expect(res.statusCode).toEqual(404);
    });
    it("should return 422 if validation error", async () => {
        const id = "invalid"; // Replace with an invalid post ID
        const res = await request(app).get(`/api/likes/include/${id}`);
        expect(res.statusCode).toEqual(422);
    });
});
