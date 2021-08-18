import express, { Request, Response } from 'express';
import { currentUser } from '@meetbe/common';
import { User } from '../../models/userModel';

const router = express.Router();

router.patch(
  '/api/users/updateuser/:id',
  currentUser,
  async (req: Request, res: Response) => {
    // try {
    const user = await User.findOne({ id: req.params.id });

    const { firstname } = req.body;

    if (!user) {
      throw new Error('User not found');
    }
    user.set({ firstname });
    user.save();
    res.status(201).send({ user });
    // } catch (err) {
    //   res.status(400).send({ err });
    // }
  }
);

export { router as updateUserRouter };
