import mongoose from 'mongoose';

import User from "../models/User.model";
import Token from '../models/Token.model';
import FoodSection from '../models/Food.Section.model'; 
import FoodItem from '../models/Food.Item.model';

class ModelService {
    getModelNames () {
        return mongoose.modelNames()
    }
}

export default ModelService
