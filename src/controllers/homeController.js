import db from "../models/index";
import {
  createNewUser,
  getAllUsers,
  getUserInforById,
  updateUser,
  deleteUser,
} from "../services/CRUDService";

let getHomePage = async (req, res) => {
  let data = await db.User.findAll();
  console.log(data);
  return res.render("homepage.ejs");
};

let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};

let getCRUD = async (req, res) => {
  return res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
  let message = await createNewUser(req.body);
  console.log(message);
  return res.send("post");
};

let displayCRUD = async (req, res) => {
  let listUsers = await getAllUsers();
  return res.render("displayCRUD.ejs", {
    dataTable: listUsers,
  });
};

let editCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await getUserInforById(userId);

    return res.render("editCRUD.ejs", {
      user: userData,
    });
  } else {
    return res.send("User not found");
  }
};

let putCRUD = async (req, res) => {
  let data = req.body;
  let allUser = await updateUser(data);
  return res.render("displayCRUD.ejs", {
    dataTable: allUser,
  });
};

let deleteCRUD = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let allUser = await deleteUser(userId);
    return res.render("displayCRUD.ejs", {
      dataTable: allUser,
    });
  } else {
    return res.send("User not found");
  }
};

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayCRUD: displayCRUD,
  editCRUD: editCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
};
