import { Message } from 'node-nats-streaming';
import { Subjects, Listener, UserCreatedEvent } from '@meetbe/common';
import { User } from '../../models/user';
import { Profile } from '../../models/profile';

export class UserCreatedListener extends Listener<UserCreatedEvent> {
  readonly subject = Subjects.UserCreated;
  queueGroupName = 'profiles-service';

  async onMessage(data: UserCreatedEvent['data'], msg: Message) {
    const { id, firstname, lastname, email } = data;
    const user = User.build({
      id: id,
      email: email,
      lastname: lastname,
      firstname: firstname,
    });
    await user.save();

    const profile = Profile.build({
      id: user.id,
      user: user,
      age: '',
      birthDate: '',
      message: '',
      profilePhoto: '',
      createdAt: new Date(Date.now()).toString(),
      hobbys: [''],
      interests: [''],
      hometown: '',
      school: '',
      profession: '',
      currentJob: '',
      socialStatus: '',
      phoneNumber: '',
    });
    await profile.save();
    console.log(user);
    console.log(profile);
    msg.ack();
  }
}
