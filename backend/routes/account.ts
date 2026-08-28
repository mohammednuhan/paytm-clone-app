import express, { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma/client.js";
import { authmiddleware } from "../authmiddleware.js";
import { Prismapg} 

const Router = express.Router();

const prisma = new PrismaClient();




// DEPOSIT
Router.post("/deposit",authmiddleware, async (req: Request, res: Response) => {

    const userId = Number((req as any).userId);
    const amount = Number(req.body.amount);

    if (!userId) {
      return res.status(403).json({
        message: "user not found"
      });
    }

    if (!amount) {
      return res.status(400).json({
        message: "amount is required"
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        message: "amount must be greater than zero"
      });
    }

    const wallet = await prisma.wallet.findUnique({
      where: {
        userId: userId
      }
    });

    if (!wallet) {
      return res.status(404).json({
        message: "wallet not found"
      });
    }

    const updatedWallet = await prisma.wallet.update({
      where: {
        userId: userId
      },
      data: {
        balance: {
          increment: amount
        }
      }
    });

    return res.json({
      message: "Deposit successful",
      balance: updatedWallet.balance
    });
  }
);


// WITHDRAW
Router.post("/withdraw",authmiddleware, async (req: Request, res: Response) => {

    const userId = Number((req as any).userId);
    const amount = Number(req.body.amount);

    if (!userId) {
      return res.status(403).json({
        message: "user not found"
      });
    }

    if (!amount) {
      return res.status(400).json({
        message: "amount is required"
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        message: "amount must be greater than zero"
      });
    }

    const wallet = await prisma.wallet.findUnique({
      where: {
        userId: userId
      }
    });

    if (!wallet) {
      return res.status(404).json({
        message: "wallet not found"
      });
    }

    if (Number(wallet.balance) < amount) {
      return res.status(400).json({
        message: "insufficient balance"
      });
    }

    const updatedWallet = await prisma.wallet.update({
      where: {
        userId: userId
      },
      data: {
        balance: {
          decrement: amount
        }
      }
    });

    return res.json({
      message: "Withdraw successful",
      balance: updatedWallet.balance
    });
  }
);


// BALANCE
Router.get("/balance",authmiddleware,async (req: Request, res: Response) => {

    const userId = Number((req as any).userId);

    if (!userId) {
      return res.status(403).json({
        message: "user not found"
      });
    }

    const wallet = await prisma.wallet.findUnique({
      where: {
        userId: userId
      }
    });

    if (!wallet) {
      return res.status(404).json({
        message: "wallet not found"
      });
    }

    return res.json({
      balance: wallet.balance
    });
  }
);


export default Router;