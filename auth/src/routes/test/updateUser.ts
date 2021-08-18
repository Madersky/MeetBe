import express, { Request, Response } from 'express';
import { currentUser } from '@meetbe/common';

import { User } from '../../models/userModel';
import { UserUpdatedPublisher } from '../../events/publishers/user-updated-publisher';
import { natsWrapper } from '../../natsWrapper';

const router = express.Router();

// DZIAŁA, ZMIENIC POD APLIKACJE
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
    new UserUpdatedPublisher(natsWrapper.client).publish({
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      version: user.version,
      id: user.id,
    });
    res.status(201).send({ user });
  }
);

export { router as updateUserRouter };
