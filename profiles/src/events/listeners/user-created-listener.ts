import { Message } from 'node-nats-streaming';
import { Subjects, Listener, UserCreatedEvent } from '@meetbe/common';
import { User } from '../../models/user';

export class UserCreatedListener extends Listener<UserCreatedEvent> {
  readonly subject = Subjects.UserCreated;
  queueGroupName = 'profiles-service';

  async onMessage(data: UserCreatedEvent['data'], msg: Message) {
    const { id, firstname, lastname, email } = data;
    const user = User.build({
      id,
      email,
      lastname,
      firstname,
    });
    await user.save();
    console.log(user);
    msg.ack();
  }
}
