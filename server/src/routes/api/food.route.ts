import { Router } from 'express';

import foodController from '../../controllers/food.controller';
import { errorWrapper } from '../../middlewares/error.wrapper';


const router: Router = Router()

// TODO w.o all
// api/food/section/get-all
router.get('/public/section/all', errorWrapper(foodController.getAllFoodSectionList.bind(foodController)))

// api/food/foodItem/getListById
router.post('/public/item/all', errorWrapper(foodController.getAllFoodItems.bind(foodController)))

//api/food/item/get-list
router.get('/public/item/get-list', errorWrapper(foodController.getAllFoodItemsById.bind(foodController)))

// api/food-item/:id/find
router.get('/public/item/:id/find', errorWrapper(foodController.findById.bind(foodController)))

export default router;
