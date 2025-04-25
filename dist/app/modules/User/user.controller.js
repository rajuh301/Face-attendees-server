"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_validation_1 = require("./user.validation");
const user_service_1 = require("./user.service");
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const registerController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validationError = (0, user_validation_1.validateRegisterInput)(req.body);
        if (validationError) {
            return res.status(400).json({ success: false, message: validationError });
        }
        const result = yield user_service_1.userService.registerUser(req.body);
        return res.status(201).json({
            success: true,
            message: 'User registered successfully!',
            data: result,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message || 'Internal Server Error',
        });
    }
});
const getAllUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.getAllUser();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User data fetched',
        data: result,
    });
}));
const getAllattendance = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.getAllattendance();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Attendance data fetched',
        data: result,
    });
}));
const markAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { faceDescriptor } = req.body;
        // Validate the face descriptor
        if (!Array.isArray(faceDescriptor) || faceDescriptor.length === 0) {
            throw new Error('Invalid or empty face descriptor.');
        }
        const result = yield user_service_1.userService.attendanceService.matchFaceAndMarkAttendance(faceDescriptor);
        res.status(200).json(Object.assign({ message: 'Attendance marked successfully.' }, result));
    }
    catch (error) {
        console.error('Error marking attendance:', error);
        res.status(400).json({ message: error.message });
    }
});
exports.userController = {
    registerController,
    markAttendance,
    getAllUser,
    getAllattendance
};
