import { celebrate } from 'celebrate';
import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
} from '../controllers/authController.js';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validations/authValidation.js';
import { Router } from 'express';

const router = Router();

router.use('/auth/register', celebrate(registerUserSchema), registerUser);

router.use('/auth/login', celebrate(loginUserSchema), loginUser);
router.use('/auth/refresh', refreshUserSession);
router.use('/auth/logout', logoutUser);

export default router;
