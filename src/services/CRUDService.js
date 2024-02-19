import bcrypt from "bcryptjs";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordFromBcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
      });
      resolve("createNewUser success");
    } catch (error) {
      reject(error);
    }
  });

  console.log(hashPasswordFromBcrypt);
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};

let getAllUsers = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findAll({
        raw: true,
      });
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

let getUserInforById = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        reject({});
      }
    } catch (error) {
      reject(error);
    }
  });
};

let updateUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;

        await user.save();
        let allUser = await db.User.findAll();
        resolve(allUser);
      } else {
        resolve("User not fund");
      }
    } catch (error) {
      reject(error);
    }
  });
};

let deleteUser = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
      });
      if (user) {
        await user.destroy();
        let allUser = await db.User.findAll();
        resolve(allUser);
      } else {
        resolve("User not fund");
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewUser: createNewUser,
  getAllUsers: getAllUsers,
  getUserInforById: getUserInforById,
  updateUser: updateUser,
  deleteUser: deleteUser,
};
