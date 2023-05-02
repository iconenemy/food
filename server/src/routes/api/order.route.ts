import { Router } from 'express';

import orderController from '../../controllers/order.controller';
import { errorWrapper } from '../../middlewares/error.wrapper';
import { bodyValidator } from '../../middlewares/body.validator';
import { orderSchemaCreate, orderSchemaUpdate } from '../../models/validates/order.joi';
import { checkJWT } from '../../middlewares/check.jwt';
import { checkIsStaff } from '../../middlewares/check.is.staff';

const router: Router = Router()

// api/order/
router.get('/', checkJWT, checkIsStaff, errorWrapper(orderController.getAll.bind(orderController)))

// api/order/:id
router.get('/:id', checkJWT, checkIsStaff, errorWrapper(orderController.findById.bind(orderController)))

// api/order/:id
router.delete('/:id', checkJWT, checkIsStaff, errorWrapper(orderController.delete.bind(orderController)))

// api/order/
router.post('/', checkJWT, bodyValidator(orderSchemaCreate), errorWrapper(orderController.create.bind(orderController)))

// api/order/:id
router.put('/:id', checkJWT, checkIsStaff, bodyValidator(orderSchemaUpdate), errorWrapper(orderController.update.bind(orderController)))

// api/order/:id/change-status
router.patch('/:id/status', checkJWT, checkIsStaff, errorWrapper(orderController.chachgeStatusOrder.bind(orderController)))

export default router;
