"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
// src/app/routes/user.route.ts
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post('/register', user_controller_1.userController.registerController);
router.get('/getAllUser', user_controller_1.userController.getAllUser);
router.post('/attendance', user_controller_1.userController.markAttendance);
router.get('/getAllattendance', user_controller_1.userController.getAllattendance);
exports.userRoutes = router; // ✅ Make sure this export exists
