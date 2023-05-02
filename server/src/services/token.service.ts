import { DocumentDefinition, Types } from 'mongoose';
import jwt from 'jsonwebtoken'

import { IUser } from '../models/types/user.type';

import Token from '../models/Token.model';

class TokenService {
    
    generateToken (payload: DocumentDefinition<Pick<IUser, 'username' | '_id' | 'role'>>) {
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_PRIVATE_KEY as string, {expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN as string})
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_PRIVATE_KEY as string, {expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN as string})

        return {accessToken, refreshToken}
    }

    veriftyAccessToken (token: string)  {
        return jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY as string)
    }

    veriftyRefreshToken (token: string)  {
        return jwt.verify(token, process.env.REFRESH_TOKEN_PRIVATE_KEY as string)
    }
    
    async createToken (user_id: Types.ObjectId) {
    return await Token.create({user_id})
    }

    async findTokenByUserId (user_id: any){
        return await Token.findOne({user_id: user_id})
    }

    async findAndPullToken (user_id: Types.ObjectId, refresh_token: string) {
        await Token.updateOne({user_id: user_id},{ $pull: {refresh_token: refresh_token}})
    }

    async pushTokenByUserId (user_id: Types.ObjectId, token: string) {
        await Token.updateOne({user_id: user_id}, { $push: {refresh_token: token}})
    }

    async popTokenByUserId (user_id: Types.ObjectId) {
        await Token.updateOne({user_id: user_id}, { $pop: {refresh_token: -1}})
    }

    async getAll () {
        return await Token.find()
    }
}

export default TokenService
