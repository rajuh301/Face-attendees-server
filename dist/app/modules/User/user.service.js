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
exports.userService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const compareFace_1 = require("../../utils/compareFace");
const registerUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, faceDescriptor } = data;
    const existingUser = yield prisma_1.default.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new Error('User already exists');
    }
    const newUser = yield prisma_1.default.user.create({
        data: {
            name,
            email,
            faceId: JSON.stringify(faceDescriptor),
        },
    });
    return newUser;
});
// ----------------
const attendanceService = {
    matchFaceAndMarkAttendance(faceDescriptor) {
        return __awaiter(this, void 0, void 0, function* () {
            // Ensure the face descriptor is valid
            if (!Array.isArray(faceDescriptor) || faceDescriptor.length === 0) {
                throw new Error('Invalid or empty face descriptor.');
            }
            // Retrieve users from the database
            const users = yield prisma_1.default.user.findMany();
            console.log(users);
            if (!users || users.length === 0) {
                throw new Error('No users found.');
            }
            let matchedUser = null;
            // Iterate through users and compare face descriptors
            for (const user of users) {
                const storedDescriptor = JSON.parse(user.faceId); // Assuming faceId is stored as a JSON string in DB
                const distance = (0, compareFace_1.euclideanDistance)(faceDescriptor, storedDescriptor);
                // Check if the match is within the threshold
                if (distance < 0.6) {
                    matchedUser = user;
                    break;
                }
            }
            if (!matchedUser) {
                throw new Error('Face not recognized.');
            }
            // Create attendance record for the matched user
            const attendance = yield prisma_1.default.attendance.create({
                data: {
                    userId: matchedUser.id,
                    timestamp: new Date(),
                },
            });
            return {
                user: {
                    id: matchedUser.id,
                    name: matchedUser.name,
                    email: matchedUser.email,
                },
                attendance,
            };
        });
    },
};
// ----------------
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const getAllUser = yield prisma_1.default.user.findMany();
    return getAllUser;
});
const getAllattendance = () => __awaiter(void 0, void 0, void 0, function* () {
    const getAllattendance = yield prisma_1.default.attendance.findMany();
    return getAllattendance;
});
exports.userService = {
    registerUser,
    getAllUser,
    attendanceService,
    getAllattendance
};
