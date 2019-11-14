"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("./controllers/UserController");
const router = express_1.Router();
router.post("/authenticate", UserController_1.UserController.Authenticate);
router.use(UserController_1.UserController.verifyToken);
exports.ApiRouter = router;
