import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const checkJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1]
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY as string, (err, decoded) => {      
          if (err) {
            return res.status(401).json({msg: 'Unauthorized'});    
          } else {
            req.access = decoded  
            next();
          }
        })
    } else {
      return res.status(405).json({msg: 'No token provided.'})
    }
}
