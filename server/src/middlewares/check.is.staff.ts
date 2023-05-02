import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const checkIsStaff = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1]
    if (token) {
        const { role } = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY as string) as JwtPayload
        if (role === 'staff' || role === 'admin'){
            next()  
        } else {
            res.status(405).json({message: 'Do not has permission'})
        }
    } else {
        return res.status(405).json({msg: 'No token provided.'})
      }
}
