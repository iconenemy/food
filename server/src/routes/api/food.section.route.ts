import { Router } from 'express';

import foodSectionController from '../../controllers/food.section.controller';
import { errorWrapper } from '../../middlewares/error.wrapper';
import { bodyValidator } from '../../middlewares/body.validator';
import { foodSectionSchemaCreate, foodSectionSchemaUpdate } from '../../models/validates/food.section.joi'
import { checkJWT } from '../../middlewares/check.jwt';
import { checkIsAdmin } from '../../middlewares/check.is.admin';

const router: Router = Router()

// api/food-section/
router.get('/', checkJWT, checkIsAdmin, errorWrapper(foodSectionController.getAll.bind(foodSectionController)))

// api/food-section/:id
router.get('/:id', checkJWT, checkIsAdmin, errorWrapper(foodSectionController.findById.bind(foodSectionController)))

// api/food-section/:id
router.delete('/:id', checkJWT, checkIsAdmin, errorWrapper(foodSectionController.delete.bind(foodSectionController)))

// api/food-section
router.post('/', checkJWT, checkIsAdmin, bodyValidator(foodSectionSchemaCreate), errorWrapper(foodSectionController.create.bind(foodSectionController)))

// api/food-section/:id
router.put('/:id', checkJWT, checkIsAdmin, bodyValidator(foodSectionSchemaUpdate), errorWrapper(foodSectionController.update.bind(foodSectionController)))

export default router;
