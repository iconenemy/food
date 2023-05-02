import { Router } from 'express';

import userController from '../../controllers/user.controller';
import { errorWrapper } from '../../middlewares/error.wrapper';
import { bodyValidator } from '../../middlewares/body.validator';
import { userSchemaCreate, userSchemaUpdate } from '../../models/validates/user.joi'

import { checkJWT } from '../../middlewares/check.jwt';
import { checkIsAdmin } from '../../middlewares/check.is.admin';
import { checkIsStaff } from '../../middlewares/check.is.staff';


const router: Router = Router()

// api/user/
router.get('/', checkJWT, checkIsStaff, errorWrapper(userController.getAll.bind(userController)))

// api/user/:id
router.get('/:id', checkJWT, checkIsAdmin, errorWrapper(userController.findById.bind(userController)))

// api/user/:id
router.delete('/:id', checkJWT, checkIsAdmin, errorWrapper(userController.delete.bind(userController)))

// api/user
router.post('/', checkJWT, checkIsAdmin, bodyValidator(userSchemaCreate), errorWrapper(userController.create.bind(userController)))

// api/user/:id
router.put('/:id', checkJWT, checkIsAdmin, bodyValidator(userSchemaUpdate), errorWrapper(userController.update.bind(userController)))

export default router;
