import { Subjects, ProfileUpdatedEvent, Listener } from '@meetbe/common';
import { Message } from 'node-nats-streaming';

import { User } from '../../models/userModel';

export class ProfileUpdatedListener extends Listener<ProfileUpdatedEvent> {
  readonly subject = Subjects.ProfileUpdated;
  queueGroupName = 'auth-service';

  async onMessage(data: ProfileUpdatedEvent['data'], msg: Message) {
    const user = await User.findOne({
      id: data.user.id,
      version: data.user.version - 1,
    });
    if (!user) {
      throw new Error('User not found');
    }
    user.set(data.user);
    await user.save();
    console.log(user);
    msg.ack();
  }
}
