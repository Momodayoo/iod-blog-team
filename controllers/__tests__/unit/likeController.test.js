const Like = require("../../../models/like"); // original like model class
const { faker } = require("@faker-js/faker");
const likeController = require("../../../controllers/likeController"); // like controller

jest.mock("../../../models/like", () => {
    const SequelizeMock = require("sequelize-mock");
    const dbMock = new SequelizeMock();
    const { faker, de } = require("@faker-js/faker");
    return dbMock.define("Like", {
        id: 1,
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
    });
    }
);

test("blabla", async () => {
    const r = await Like.findOne({ where: { id: 1 } });
    expect(r).toEqual(
        expect.objectContaining({
            id: expect.any(Number),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        })
        );
    });

    // test getLikes
    describe("getLikes", () => {
        it("should return all likes", async () => {
            const likes = await likeController.getLikes();
            expect(likes.length).toEqual(1);
        });
    });
    // test getLike
    describe("getLike", () => {
        it("should return a like by ID", async () => {
            const id = 1; // Replace with a valid like ID
            const bob = await likeController.getLike(id);
            expect(bob.id).toEqual(id);
        });
    });
    // test createLike
    describe("createLike", () => {
        it("should create a new like", async () => {
            const like = {
            };
            const createdLike = await likeController.createLike(like);
            expect(createdLike.id).toEqual(1);
        });
    });
    // test updateLike
    describe("updateLike", () => {
        it("should update a like by ID", async () => {
            const id = 1; // Replace with a valid like ID
            const res = [1];

            const like = {
            };
            const updatedLike = await likeController.updateLike(id, like);
            expect(updatedLike).toEqual(res);
        });
    });
    // test deleteLike
    describe("deleteLike", () => {
        it("should delete a like by ID", async () => {
            const id = 1; // Replace with a valid like ID
            const res = 1;

            const deletedLike = await likeController.deleteLike(id);
            expect(deletedLike).toEqual(res);
        });
    });