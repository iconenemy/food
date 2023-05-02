import { DocumentDefinition, Types } from "mongoose";

import { IUser, IUserUpdate } from "../models/types/user.type";
import User from "../models/User.model";

export default class UserService {
    async createUser (data: DocumentDefinition<Omit<IUser, 'is_active'>>) {
        return await User.create(data)
    }

    async findUserByUsername (username: DocumentDefinition<Pick<IUser, 'username'>>) {
        return await User.findOne(username)
    }

    async findUserByEmail (email: DocumentDefinition<Pick<IUser, 'email'>>) {
        return await User.findOne(email)
    }

    async findUserByPhoneNumber (phone_number: DocumentDefinition<Pick<IUser, 'phone_number'>>){
        return await User.findOne(phone_number)
    }

    async findUserById (id: Types.ObjectId) {
        return await User.findById(id)
    }

    async deleteUserById (id: Types.ObjectId){
        return await User.findByIdAndDelete(id)
    }

    async getAll () {
        return await User.find()
    }

    async updateUserById (id: Types.ObjectId, updateData: DocumentDefinition<IUserUpdate>) {
        return await User.findByIdAndUpdate(id, updateData)
    }
}
