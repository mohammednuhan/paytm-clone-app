import express, { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma/client.js";
import jwt from "jsonwebtoken";
import { z } from "zod";
import authmiddleware from "../authmiddleware.js";

const Routes = express.Router();

const prisma = new PrismaClient();

const SECRET_KEY = "your_secret_key";

Routes.post("/signup",async (req: Request, res: Response) => {

    const { username, firstName, lastName, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "username and password are required"
      });
    }

    const userExist = await prisma.user.findUnique({
      where: {
        username: username
      }
    });

    if (userExist) {
      return res.status(403).json({
        message: "user already exist"
      });
    }

    const user = await prisma.user.create({
      data: {
        username: username,
        firstName: firstName,
        lastName: lastName,
        password: password
      }
    });

    if (!user) {
      return res.status(403).json({
        message: "invalid error"
      });
    }

    return res.status(200).json({
      message: "user created successfully"
    });
  }
);


Routes.post("/signin",async (req: Request, res: Response) => {

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "username and password are required"
      });
    }

    const userExist = await prisma.user.findUnique({
      where: {
        username: username
      }
    });

    if (!userExist) {
      return res.status(403).json({
        message: "user not found"
      });
    }

    if (userExist.password !== password) {
      return res.status(403).json({
        message: "invalid password"
      });
    }

    const token = jwt.sign(
      {
        userId: userExist.id
      },
      SECRET_KEY
    );

    return res.status(200).json({
      message: "user logged",
      token: token
    });
  }
);


const updatebody = z.object({
  username: z.string().optional(),
  password: z.string().optional()
});


Routes.put("/",authmiddleware,async (req: Request, res: Response) => {

    const result = updatebody.safeParse(req.body);

    if (!result.success) {
      return res.status(403).json({
        message: "invalid input"
      });
    }

    const userId = Number((req as any).userId);

    if (!userId) {
      return res.status(403).json({
        message: "user not found"
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!user) {
      return res.status(404).json({
        message: "user not found"
      });
    }

    await prisma.user.update({
      where: {
        id: userId
      },
      data: result.data
    });

    return res.json({
      message: "user update"
    });
  }
);


Routes.get(
  "/bulk",
  async (req: Request, res: Response) => {

    const filter = String(req.query.filter || "");

    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            firstName: {
              contains: filter,
              mode: "insensitive"
            }
          },
          {
            lastName: {
              contains: filter,
              mode: "insensitive"
            }
          }
        ]
      }
    });

    return res.json({
      user: users.map((user) => ({
        username: user.username,
        id: user.id
      }))
    });
  }
);


export default Routes;