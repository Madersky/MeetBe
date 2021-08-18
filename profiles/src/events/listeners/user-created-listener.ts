import { Message } from 'node-nats-streaming';
import { Subjects, Listener, UserCreatedEvent } from '@meetbe/common';
import { User } from '../../models/user';

export class UserCreatedListener extends Listener<UserCreatedEvent> {
  readonly subject = Subjects.UserCreated;
  queueGroupName = 'profiles-service';

  async onMessage(data: UserCreatedEvent['data'], msg: Message) {
    const { id, username, email } = data;
    const user = User.build({
      id,
      username,
      email,
    });
    await user.save();

    msg.ack();
  }
}
