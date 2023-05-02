import { Router } from 'express';

import { errorWrapper } from '../../middlewares/error.wrapper';
import foodItemController from '../../controllers/food.item.controller'; 
import { bodyValidator } from '../../middlewares/body.validator';
import { foodItemSchemaCreate, foodItemSchemaUpdate } from '../../models/validates/food.item.joi'
import { checkJWT } from '../../middlewares/check.jwt';
import { checkIsAdmin } from '../../middlewares/check.is.admin';
import { checkIsStaff } from '../../middlewares/check.is.staff';

const router: Router = Router()

// api/food-item/
router.get('/',  errorWrapper(foodItemController.getAll.bind(foodItemController)))

// api/food-item/:id
router.get('/:id',  errorWrapper(foodItemController.findById.bind(foodItemController)))

// api/food-item/:id
router.delete('/:id', checkJWT, checkIsAdmin, errorWrapper(foodItemController.delete.bind(foodItemController)))

// api/food-item/
router.post('/', checkJWT, checkIsAdmin, bodyValidator(foodItemSchemaCreate), errorWrapper(foodItemController.create.bind(foodItemController)))

// api/food-item/:id
router.put('/:id', checkJWT, checkIsAdmin, bodyValidator(foodItemSchemaUpdate), errorWrapper(foodItemController.update.bind(foodItemController)))

export default router;
