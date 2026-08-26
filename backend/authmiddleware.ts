import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key";

function authmiddleware(req: Request,res: Response,next: NextFunction) {

  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({
      message: "token is missing"
    });
  }

  try {

    const decoded = jwt.verify(token, SECRET_KEY) as {
      userId: number;
    };

    const userId = decoded.userId;

    if (!userId) {
      return res.status(403).json({
        message: "invalid token"
      });
    }

    (req as any).userId = userId;

    next();

  } catch (error) {

    return res.status(403).json({
      message: "invalid token"
    });

  }
}

export default authmiddleware;