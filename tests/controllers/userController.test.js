const mongoose = require("mongoose");
const {
  beforeEach,
  afterEach,
  expect,
  test,
  describe,
} = require("@jest/globals");
const mongoConnect = require("../../config/dbConnection");
const {
  getAllUsers,
  getUserById,
} = require("../../controllers/userController");
const { mockResponse, mockRequest, mockNext } = require("../intercepter");
const userModal = require("../../modals/userModal.js");

beforeEach(async () => {
  await mongoConnect(process.env.MONGO_URI_TEST);
});

afterEach((done) => {
  mongoose.connection.dropDatabase(() => {
    done();
  });
});

describe("Check method getAllUsers", () => {
  test("should 200 and return correct value", async () => {
    const req = mockRequest();
    const res = mockResponse();
    const next = mockNext();

    await getAllUsers(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
  });
});

describe("Check method getUserById", () => {
  test("should 404 and return correct value", async () => {
    const req = mockRequest();
    req.params.userId = "507f191e810c19729de860ea";
    const res = mockResponse();
    const next = mockNext();
    await getUserById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ msg: "User not Found" });
  });

  test("should return error with wrong id", async () => {
    const req = mockRequest();
    req.params.userId = "507f19110c19729de860ea";
    const res = mockResponse();
    const next = mockNext();
    await getUserById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  test("should 200 and return correct value", async () => {
    let user = await userModal.findOne({ email: "rizwan@websultanate.com" });
    if (!user) {
      user = await userModal.create({
        email: "rizwan@websultanate.com",
        firstName: "Rizwan",
        lastName: "Ahmad",
      });
    }

    const req = mockRequest();
    req.params.userId = user._id;
    const res = mockResponse();
    const next = mockNext();
    await getUserById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
  });
});

afterAll((done) => {
  mongoose.connection.close(() => done());
});
