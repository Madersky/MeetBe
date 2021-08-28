import express, { Request, Response } from 'express';
import { currentUser } from '@meetbe/common';

import { User } from '../../models/userModel';
import { UserUpdatedPublisher } from '../../events/publishers/user-updated-publisher';
import { natsWrapper } from '../../natsWrapper';

const router = express.Router();

// DZIAŁA, ZMIENIC POD APLIKACJE
router.patch(
  '/api/users/updateuser/:_id',
  currentUser,
  async (req: Request, res: Response) => {
    const user = await User.findById(req.params._id);

    if (!user) {
      throw new Error('User not found');
    }
    user.set(req.body);
    await user.save();
    new UserUpdatedPublisher(natsWrapper.client).publish({
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      version: user.version,
      _id: user._id,
    });
    res.status(201).send({ user });
  }
);

export { router as updateUserRouter };
