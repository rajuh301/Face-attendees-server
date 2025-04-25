// src/app/routes/user.route.ts
import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.post('/register', userController.registerController);

router.get('/getAllUser', userController.getAllUser);

router.post('/attendance', userController.markAttendance);
router.get('/getAllattendance', userController.getAllattendance);

export const userRoutes = router; // ✅ Make sure this export exists
