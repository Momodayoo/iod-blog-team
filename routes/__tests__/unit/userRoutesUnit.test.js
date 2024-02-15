const app = require("../../../app");
const request = require("supertest");
const { faker } = require("@faker-js/faker");
const userController = require("../../../controllers/userController");
const userRoutes = require("../../userRoutes");

app.use("/api/users", userRoutes);

describe("User Routes", () => {

  describe("GET /api/users", () => {
    it("should return all users", async () => {
      const getUsersMock = jest.spyOn(userController, "getUsers");
      getUsersMock.mockResolvedValueOnce([
        {
          id: 1,
          name: "John Doe",
          password: "password",
          email: "john@dudes.com",
        },
      ]);

      const res = await request(app).get("/api/users");

      expect(res.statusCode).toEqual(200);
      expect(res.body.data.length).toEqual(1);
      expect(res.body.data[0].name).toEqual("John Doe");

      getUsersMock.mockRestore();
    });
  });

  describe("GET /api/users/:id", () => {
    it("should return a user by ID", async () => {
      const getUserMock = jest.spyOn(userController, "getUser");
      getUserMock.mockResolvedValueOnce({
        id: 1,
        name: "John Doe",
        password: "password",
        email: "john@dudes.com",
      });

      const res = await request(app).get("/api/users/1");

      expect(res.statusCode).toEqual(200);
      expect(res.body.data.id).toEqual(1);
      expect(res.body.data.name).toEqual("John Doe");

      getUserMock.mockRestore();
    });

    it("should return 404 if user not found", async () => {
      const getUserMock = jest.spyOn(userController, "getUser");
      getUserMock.mockResolvedValueOnce(null);

      const res = await request(app).get("/api/users/999");

      expect(res.statusCode).toEqual(404);

      getUserMock.mockRestore();
    });

    it("should return 422 if validation error", async () => {
      const res = await request(app).get("/api/users/invalid");

      expect(res.statusCode).toEqual(422);
    });
  });

  describe("POST /api/users", () => {
    it("should create a new user", async () => {
      const createUserMock = jest.spyOn(userController, "createUser");
      createUserMock.mockResolvedValueOnce({
        id: 1,
        name: "John Doe",
        password: "password",
        email: "john@create.com",
      });

      const res = await request(app)
        .post("/api/users")
        .send({
          name: "John Doe",
          email: "john@dudes.com",
          password: "password",
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body.data.id).toEqual(1);
      expect(res.body.data.name).toEqual("John Doe");

      createUserMock.mockRestore();
    });

    it("should return 422 if email validation error", async () => {
      const res = await request(app)
        .post("/api/users")
        .send({
          name: "John Doe",
          email: "",
          password: "password",
        });

      expect(res.statusCode).toEqual(422);
    });

    it("should return 422 if invalid email error", async () => {
      const res = await request(app)
        .post("/api/users")
        .send({
          name: "John Doe",
          email: "",
          password: "password",
        });

      expect(res.statusCode).toEqual(422);
    });

    it("should return 422 if password validation error", async () => {
      const res = await request(app)
        .post("/api/users")
        .send({
          name: "John Doe",
          email: faker.internet.email(),
          password: "",
        });

      expect(res.statusCode).toEqual(422);
    });

    it("should return 422 if password too short error", async () => {
      const res = await request(app)
        .post("/api/users")
        .send({
          name: "John Doe",
          email: faker.internet.email(),
          password: "short",
        });

      expect(res.statusCode).toEqual(422);
    });

    it("should return 422 if password too long error", async () => {
      const res = await request(app)
        .post("/api/users")
        .send({
          name: "John Doe",
          email: faker.internet.email(),
          password: "thispasswordistoolongvjjsfergkjrngjrngkjdfngkjfngkjrngkjerngkjngjngjngjkngjkngkjngkjfngjkngjngkjngkjfdn",
        });

      expect(res.statusCode).toEqual(422);
    });

    it("should return 422 if name validation error", async () => {
      const res = await request(app)
        .post("/api/users")
        .send({
          name: "",
          email: faker.internet.email(),
          password: "password",
        });

      expect(res.statusCode).toEqual(422);
    });
  });

  describe("PUT /api/users/:id", () => {
    it("should update a user by ID", async () => {
      const updateUserMock = jest.spyOn(userController, "updateUser");
      updateUserMock.mockResolvedValueOnce({ id: 1, name: "Updated Name" });

      const res = await request(app)
        .put("/api/users/1")
        .send({
          name: "Updated Name",
          email: "john@dudes.com",
          password: "updated_password",
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body.data.id).toEqual(1);
      expect(res.body.data.name).toEqual("Updated Name");

      updateUserMock.mockRestore();
    });

    it("should return 404 if user not found", async () => {
      const updateUserMock = jest.spyOn(userController, "updateUser");
      updateUserMock.mockResolvedValueOnce([0]);

      const res = await request(app)
        .put("/api/users/999")
        .send({
          name: "Updated Name",
          email: "updated_email@dudes.com",
          password: "updated_password",
        });

      expect(res.statusCode).toEqual(404);

      updateUserMock.mockRestore();
    });
    it("should return 422 if no email validation error", async () => {
      const res = await request(app)
        .put("/api/users/1")
        .send({
          name: "Updated Name",
          email: "",
          password: "updated_password",
        });
      expect(res.statusCode).toEqual(422);
    });


    it("should return 422 if invalid email error", async () => {
      const res = await request(app)
        .put("/api/users/1")
        .send({
          name: "Updated Name",
          email: "invalid_email",
          password: "updated_password",
        });

      expect(res.statusCode).toEqual(422);
    });

    it("should return 422 if password validation error", async () => {
      const res = await request(app)
        .put("/api/users/1")
        .send({
          name: "Updated Name",
          email: faker.internet.email(),
          password: "",
        });

      expect(res.statusCode).toEqual(422);
    });

    it("should return 422 if password too short error", async () => {
      const res = await request(app)
        .put("/api/users/1")
        .send({
          name: "Updated Name",
          email: faker.internet.email(),
          password: "short",
        });

      expect(res.statusCode).toEqual(422);
    });

    it("should return 422 if password too long error", async () => {
      const res = await request(app)
        .put("/api/users/1")
        .send({
          name: "Updated Name",
          email: faker.internet.email(),
          password: "thispasswordistoolongvjjsfergkjrngjrngkjdfngkjfngkjrngkjerngkjngjngjngjkngjkngkjngkjfngjkngjngkjngkjfdn",
        });

      expect(res.statusCode).toEqual(422);
    });

    it("should return 422 if name validation error", async () => {
      const res = await request(app)
        .put("/api/users/1")
        .send({
          name: "",
          email: faker.internet.email(),
          password: "password",
        });

      expect(res.statusCode).toEqual(422);
    });
  });

  describe("DELETE /api/users/:id", () => {
    it("should delete a user by ID", async () => {
      const deleteUserMock = jest.spyOn(userController, "deleteUser");
      deleteUserMock.mockResolvedValueOnce(1);

      const res = await request(app).delete("/api/users/1");

      expect(res.statusCode).toEqual(200);

      deleteUserMock.mockRestore();
    });

    it("should return 404 if user not found", async () => {
      const deleteUserMock = jest.spyOn(userController, "deleteUser");
      deleteUserMock.mockResolvedValueOnce(false);

      const res = await request(app).delete("/api/users/999");

      expect(res.statusCode).toEqual(404);

      deleteUserMock.mockRestore();
    });
  });
});
