"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("./controllers/UserController");
const ClientController_1 = require("./controllers/ClientController");
const router = express_1.Router();
router.post("/authenticate", UserController_1.UserController.Authenticate);
router.post("/buyer", ClientController_1.ClientController.addItem);
exports.ApiRouter = router;
