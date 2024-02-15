const User = require("../../../models/user"); // original user model class
const { faker } = require("@faker-js/faker");
const userController = require("../../../controllers/userController"); // user controller

jest.mock("../../../models/user", () => {
  const SequelizeMock = require("sequelize-mock");
  const dbMock = new SequelizeMock();
  const { faker, de } = require("@faker-js/faker");
  return dbMock.define("User", {
    id: 1,
    name: "myusername",
    email: faker.internet.email(),
    password: faker.internet.password(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  });
});

test("blabla", async () => {
  const r = await User.findOne({ where: { id: 1 } });
  expect(r).toEqual(
    expect.objectContaining({
      id: expect.any(Number),
      name: "myusername",
      email: expect.any(String),
      password: expect.any(String),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  );
});

// test getUsers
describe("getUsers", () => {
  it("should return all users", async () => {
    const users = await userController.getUsers();
    expect(users.length).toEqual(1);
  });
});
// test getUser
describe("getUser", () => {
  it("should return a user by ID", async () => {
    const id = 1; // Replace with a valid user ID
    const bob = await userController.getUser(id);
    expect(bob.id).toEqual(id);
  });
});
// test createUser
describe("createUser", () => {
  it("should create a new user", async () => {
    const user = {
      name: "John Doe",
      email: faker.internet.email(),
      password: "password",
    };
    const createdUser = await userController.createUser(user);
    expect(createdUser.id).toEqual(1);
  });
});
// test updateUser
describe("updateUser", () => {
  it("should update a user by ID", async () => {
    const res = [1]; // Replace with a valid user ID
    const user = {
        id: 1,
      name: "John Doe",
      email: faker.internet.email(),
      password: "password",
    };
    const updatedUser = await userController.updateUser(user.id, user);
    expect(updatedUser).toEqual(res);
  });
});
// test deleteUser
describe("deleteUser", () => {
  it("should delete a user by ID", async () => {
    const id = 1; // Replace with a valid user ID
    const deletedUser = await userController.deleteUser(id);
    expect(deletedUser).toEqual(1);
  });
});
