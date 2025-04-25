import { Request, Response, NextFunction } from 'express';
import { validateRegisterInput } from './user.validation';
import { userService } from './user.service';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const registerController = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const validationError = validateRegisterInput(req.body);
    if (validationError) {
      return res.status(400).json({ success: false, message: validationError });
    }

    const result = await userService.registerUser(req.body);
    return res.status(201).json({
      success: true,
      message: 'User registered successfully!',
      data: result,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || 'Internal Server Error',
    });
  }
};

const getAllUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await userService.getAllUser();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User data fetched',
    data: result,
  });
});


const getAllattendance = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await userService.getAllattendance();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Attendance data fetched',
    data: result,
  });
});

const markAttendance = async (req: Request, res: Response) => {
  try {
    const { faceDescriptor } = req.body;

    // Validate the face descriptor
    if (!Array.isArray(faceDescriptor) || faceDescriptor.length === 0) {
      throw new Error('Invalid or empty face descriptor.');
    }

    const result = await userService.attendanceService.matchFaceAndMarkAttendance(faceDescriptor);


    res.status(200).json({
      message: 'Attendance marked successfully.',
      ...result,
    });
  } catch (error: any) {
    console.error('Error marking attendance:', error);
    res.status(400).json({ message: error.message });
  }
};


export const userController = {
  registerController,
  markAttendance,
  getAllUser,
  getAllattendance
};
