import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
//
import AuthenticationTokenMissingException from '../exceptions/authMissingToken.exception';
import WrongAuthenticationTokenException from '../exceptions/wrongAuthToken.exception';
import DataStoredInToken from '../interfaces/dataStoredInToken.interface';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import userModel from '../models/user.model';

async function authMiddleware(req: RequestWithUser, res: Response, next: NextFunction) {
    const cookies = req.cookies;
    if (
        cookies &&
        cookies.Authorization
    ) {
        const secret = "alabama"; //TODO
        try {
            const verificationResponse = jwt.verify(cookies.Authorization, secret) as DataStoredInToken;
            const id = verificationResponse._id;
            const user = await userModel.findById(id);

            if (user) {
                req.user = user;
                next();
            } else {
                next(new WrongAuthenticationTokenException());
            }
        } catch (error) {
            next(new WrongAuthenticationTokenException());
        }
    } else {
        next(new AuthenticationTokenMissingException());
    }
}

export default authMiddleware;