const Comment = require("../../../models/comment"); // original comment model class
const { faker } = require("@faker-js/faker");
const commentController = require("../../../controllers/commentController"); // comment controller

jest.mock("../../../models/comment", () => {
    const SequelizeMock = require("sequelize-mock");
    const dbMock = new SequelizeMock();
    const { faker, de } = require("@faker-js/faker");
    return dbMock.define("Comment", {
        id: 1,
        content: "mycontent",
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
    });
    });

test("blabla", async () => {
    const r = await Comment.findOne({ where: { id: 1 } });
    expect(r).toEqual(
        expect.objectContaining({
            id: expect.any(Number),
            content: "mycontent",
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        })
        );
    });

    // test getComments
    describe("getComments", () => {
        it("should return all comments", async () => {
            const comments = await commentController.getComments();
            expect(comments.length).toEqual(1);
        });
    });
    // test getComment
    describe("getComment", () => {
        it("should return a comment by ID", async () => {
            const id = 1; // Replace with a valid comment ID
            const bob = await commentController.getComment(id);
            expect(bob.id).toEqual(id);
        });
    });
    // test createComment
    describe("createComment", () => {
        it("should create a new comment", async () => {
            const comment = {
                content: "mycontent",
            };
            const createdComment = await commentController.createComment(comment);
            expect(createdComment.id).toEqual(1);
        });
    });
    // test updateComment
    describe("updateComment", () => {
        it("should update a comment by ID", async () => {
            const id = 1; // Replace with a valid comment ID
            const res = [1];

            const comment = {
                content: "mycontent",
            };
            const updatedComment = await commentController.updateComment(id, comment);
            expect(updatedComment).toEqual(res);
        });
    });
    // test deleteComment
    describe("deleteComment", () => {
        it("should delete a comment by ID", async () => {
            const id = 1; // Replace with a valid comment ID
            const deletedComment = await commentController.deleteComment(id);
            expect(deletedComment).toEqual(id);
        });
    });