const express = require("express");

const Router = express.Router();
const AuthController = require("../controlers/authControler");

Router.route("/signup").post(AuthController.signUp);
Router.route("/login").post(AuthController.login);
Router.route("/protect").post(AuthController.protect);
Router.route("/search").post(AuthController.search);
Router.route("/friends").post(AuthController.friend);
Router.route("/addfriends").post(AuthController.addfriend);

module.exports = Router;
