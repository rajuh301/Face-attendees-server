import prisma from '../../../shared/prisma';
import { euclideanDistance } from '../../utils/compareFace';

interface RegisterData {
    name: string;
    email: string;
    faceDescriptor: number[];
}

const registerUser = async (data: RegisterData) => {
    const { name, email, faceDescriptor } = data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new Error('User already exists');
    }

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            faceId: JSON.stringify(faceDescriptor),
        },
    });

    return newUser;
};


// ----------------
const attendanceService = {
    async matchFaceAndMarkAttendance(faceDescriptor: number[]) {
        // Ensure the face descriptor is valid
        if (!Array.isArray(faceDescriptor) || faceDescriptor.length === 0) {
            throw new Error('Invalid or empty face descriptor.');
        }

        // Retrieve users from the database
        const users = await prisma.user.findMany();
        console.log(users)
        if (!users || users.length === 0) {
            throw new Error('No users found.');
        }

        let matchedUser = null;

        // Iterate through users and compare face descriptors
        for (const user of users) {
            const storedDescriptor = JSON.parse(user.faceId); // Assuming faceId is stored as a JSON string in DB
            const distance = euclideanDistance(faceDescriptor, storedDescriptor);

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
        const attendance = await prisma.attendance.create({
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
    },
};
// ----------------




const getAllUser = async () => {
    const getAllUser = await prisma.user.findMany();
    return getAllUser;
};


const getAllattendance = async () => {
    const getAllattendance = await prisma.attendance.findMany();
    return getAllattendance;
};

export const userService = {
    registerUser,
    getAllUser,
    attendanceService,
    getAllattendance
};
