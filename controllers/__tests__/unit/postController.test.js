const Post = require("../../../models/post"); // original post model class
const { faker } = require("@faker-js/faker");
const postController = require("../../../controllers/postController"); // post controller

jest.mock("../../../models/post", () => {
    const SequelizeMock = require("sequelize-mock");
    const dbMock = new SequelizeMock();
    const { faker, de } = require("@faker-js/faker");
    return dbMock.define("Post", {
        id: 1,
        title: "mytitle",
        content: "mycontent",
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
    });
    });

    test("blabla", async () => {
        const r = await Post.findOne({ where: { id: 1 } });
        expect(r).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                title: "mytitle",
                content: "mycontent",
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            })
            );
        });

        // test getPosts
        describe("getPosts", () => {
            it("should return all posts", async () => {
                const posts = await postController.getPosts();
                expect(posts.length).toEqual(1);
            });
        });
        // test getPost
        describe("getPost", () => {
            it("should return a post by ID", async () => {
                const id = 1; // Replace with a valid post ID
                const bob = await postController.getPost(id);
                expect(bob.id).toEqual(id);
            });
        });
        // test createPost
        describe("createPost", () => {
            it("should create a new post", async () => {
                const post = {
                    title: "mytitle",
                    content: "mycontent",
                };
                const createdPost = await postController.createPost(post);
                expect(createdPost.id).toEqual(1);
            });
        });
        // test updatePost
        describe("updatePost", () => {
            it("should update a post by ID", async () => {
                const id = 1; // Replace with a valid post ID
                const post = {
                    title: "mytitle",
                    content: "mycontent",
                };
                const updatedPost = await postController.updatePost(id, post);
                expect(updatedPost[0]).toEqual(1);
            });
        });
        // test deletePost
        describe("deletePost", () => {
            it("should delete a post by ID", async () => {
                const id = 1; // Replace with a valid post ID
                const deletedPost = await postController.deletePost(id);
                expect(deletedPost).toEqual(1);
            });
        });

        // test getPosts by user
        describe("getPostsByUser", () => {
            it("should return all posts by user", async () => {
                const id = 1; // Replace with a valid user ID
                const posts = await postController.getPostsByUser(id);
                expect(posts.length).toEqual(1);
            });
        });