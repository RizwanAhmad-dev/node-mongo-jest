const userModal = require("../modals/userModal.js");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userModal.find({});
    res.status(200).json({
      users,
    });
  } catch (error) {
    console.log("Error in getAllUsers", error);
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await userModal.findOne({
      _id: userId,
    });
    if (user) {
      res.status(200).json({
        user,
      });
    } else {
      res.status(404).json({ msg: "User not Found" });
    }
  } catch (error) {
    console.log("Error in getuserById", error);
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email } = req.body;
    const isEmailInUse = await userModal.findOne({ email });
    if (isEmailInUse) {
      return res.status(403).json({ msg: "Email already in use" });
    }
    const user = await userModal.create({ firstName, lastName, email });
    res.status(200).json({
      user,
    });
  } catch (error) {
    console.log("Error in getuserById", error);
    next(error);
  }
};

module.exports = { createUser, getAllUsers, getUserById };
