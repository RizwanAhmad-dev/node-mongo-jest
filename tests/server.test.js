const mongoose = require("mongoose");
const supertest = require("supertest");
const { beforeEach, afterEach, expect, test } = require("@jest/globals");
const app = require("../server.js");
const mongoConnect = require("../config/dbConnection.js");
const userModal = require("../modals/userModal.js");

beforeEach(async () => {
  await mongoConnect(process.env.MONGO_URI_TEST);
});

afterEach((done) => {
  mongoose.connection.dropDatabase(() => {
    done();
  });
});

test("POST /users already exist", async () => {
  await userModal.create({
    email: "rizwan1@websultanate.com",
    firstName: "Rizwan1",
    lastName: "Ahmad",
  });
  await supertest(app)
    .post("/users")
    .send({
      firstName: "Rizwan1",
      lastName: "Ahmad",
      email: "rizwan1@websultanate.com",
    })
    .expect(403)
    .then((res) => {
      expect(res.body.msg).toEqual("Email already in use");
    });
});

test("POST /users add new user", async () => {
  await supertest(app)
    .post("/users")
    .send({
      firstName: "Rizwan2",
      lastName: "Ahmad",
      email: "rizwan2@websultanate.com",
    })
    .expect(200)
    .then((res) => {
      expect(res.body.user.email).toEqual("rizwan2@websultanate.com");
    });
});

test("GET /users", async () => {
  await userModal.create({
    email: "rizwan@websultanate.com",
    firstName: "Rizwan",
    lastName: "Ahmad",
  });
  await supertest(app)
    .get("/users")
    .expect(200)
    .then((res) => {
      expect(res.body.users.length).toBe(1);
    });
});

afterAll((done) => {
  mongoose.connection.close(() => done());
});
