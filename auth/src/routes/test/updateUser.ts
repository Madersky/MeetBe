import express, { Request, Response } from 'express';
import { currentUser } from '@meetbe/common';
import { User } from '../../models/userModel';

const router = express.Router();

router.patch(
  '/api/users/updateuser/:id',
  currentUser,
  async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);

    const { firstname } = req.body;

    if (!user) {
      throw new Error('User not found');
    }
    user.set({ firstname });
    await user.save();
    res.status(201).send({ user });
  }
);

export { router as updateUserRouter };
