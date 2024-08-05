import express from 'express';
import userController from '../controller/user.controller.js';
import authenticate from '../controller/authentication.controller.js'

const router = express.Router();

// Authenticate user
router.post('/login', authenticate);

// Create user route
router.post('/create', userController.createUser);

// Get all users
router.get('/view-users', userController.findAllUser);

// Get user by email route
router.get('/:email', userController.findUser);

// Update user by email route
router.put('/:email', userController.updateUser);

// Delete user by email route
router.delete('/:email', userController.deleteUser);

export default router;