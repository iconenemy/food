import { Router } from 'express';

import { errorWrapper } from '../../middlewares/error.wrapper';
import paymentMethodController from '../../controllers/payment.method.controller'
import { bodyValidator } from '../../middlewares/body.validator';
import { paymentMethodSchemaCreate, paymentMethodSchemaUpdate } from '../../models/validates/payment.method.joi';
import { checkJWT } from '../../middlewares/check.jwt';
import { checkIsAdmin } from '../../middlewares/check.is.admin';


const router: Router = Router()

// api/payment-method/
router.get('/', checkJWT, errorWrapper(paymentMethodController.getAll.bind(paymentMethodController)))

// api/payment-method/:id
router.get('/:id', checkJWT, checkIsAdmin, errorWrapper(paymentMethodController.findById.bind(paymentMethodController)))

// api/payment-method/:id
router.delete('/:id', checkJWT, checkIsAdmin, errorWrapper(paymentMethodController.delete.bind(paymentMethodController)))

// api/payment-method
router.post('/', checkJWT, checkIsAdmin, bodyValidator(paymentMethodSchemaCreate), errorWrapper(paymentMethodController.create.bind(paymentMethodController)))

// api/payment-method/:id
router.put('/:id', checkJWT, checkIsAdmin, bodyValidator(paymentMethodSchemaUpdate), errorWrapper(paymentMethodController.update.bind(paymentMethodController)))

export default router;
