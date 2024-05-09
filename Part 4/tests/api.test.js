const request = require("supertest");
const app = require("../app");
const { describe, it } = require("mocha");
const assert = require("assert");
const Blog = require("../db.js");
const mongoose = require("mongoose");

const api = request(app);

// tehtävä 4.13

describe("DELETE /api/blogs/:id", function () {
  it("should delete a blog by id and confirm it no longer exists", async () => {
    const blogToBeDeleted = new Blog({
      title: "Delete Me",
      author: "Deleter",
      url: "https://deleteme.com",
      likes: 1,
    });
    await blogToBeDeleted.save();

    // Poista blogi
    await api.delete(`/api/blogs/${blogToBeDeleted._id}`).expect(204);

    const response = await api.get(`/api/blogs/${blogToBeDeleted._id}`);
    assert.strictEqual(response.status, 404);
  });
});

/*
// Tehtävä 4.10


const initialBlogs = [
  {
    title: "blaablaa",
    author: "Jani Rouva",
    url: "https://oeeeeeee.com",
    likes: 69,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  console.log("entered test");

  const blogObjects = initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

it("Blog can be added", async () => {
  const { expect } = await import("chai");

  const newBlog = {
    title: "Test Blog",
    author: "Test Author",
    url: "https://testblog.com",
    likes: 10,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const titles = response.body.map((r) => r.title);

  expect(response.body).lengthOf(initialBlogs.length + 1);
  expect(titles).contain("Test Blog");
});

after(() => {
  mongoose.connection.close();
  console.log("exiting test");
});
*/

// tehtävä 4.8
/*describe("GET /api/blogs", () => {
  it("returns JSON with correct number of blogs", async () => {
    const chai = await import("chai");
    const expect = chai.expect;

    const response = await request(app)
      .get("/api/blogs")
      .expect("Content-Type", /application\/json/)
      .expect(200);

    expect(response.body.length).to.equal(3); // blogien mäöärä
  });
});
*/

/*
// Tehtävä 4.9
describe("GET /api/blogs", () => {
  it("returns JSON with correct number of blogs", async () => {
    const response = await request(app)
      .get("/api/blogs")
      .expect("Content-Type", /application\/json/)
      .expect(200);

    assert.strictEqual(response.body[0].id !== undefined, true);
  });
});
*/
