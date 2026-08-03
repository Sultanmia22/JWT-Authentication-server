import { Request, Response } from "express";

const privateData = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      message: "This is private data",
      user: req.user ?? null,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const privateController = {
    privateData
}