import express, { Request, Response } from 'express';

const router = express.Router()

router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'API is working smoothly! 🚀',
  });
});

export default router