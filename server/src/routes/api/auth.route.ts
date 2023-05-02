import { Router } from 'express';

import { bodyValidator } from '../../middlewares/body.validator';
import { userSchemaCreate, userSchemaLogin } from '../../models/validates/user.joi';
import { errorWrapper } from '../../middlewares/error.wrapper';
import authController from '../../controllers/auth.controller';

const router: Router = Router()

router.post('/register', bodyValidator(userSchemaCreate), errorWrapper(authController.register.bind(authController)))

// api/auth/login
router.post('/login', bodyValidator(userSchemaLogin), errorWrapper(authController.login.bind(authController)))

// api/auth/logout
router.get('/logout', errorWrapper(authController.logout.bind(authController)))

// api/auth/refresh
router.get('/refresh', errorWrapper(authController.refresh.bind(authController)))

export default router;
