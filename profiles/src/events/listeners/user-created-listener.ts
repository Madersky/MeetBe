import { Message } from 'node-nats-streaming';
import { Subjects, Listener, UserCreatedEvent } from '@meetbe/common';
import { User } from '../../models/user';
import { Profile } from '../../models/profile';

export class UserCreatedListener extends Listener<UserCreatedEvent> {
  readonly subject = Subjects.UserCreated;
  queueGroupName = 'profiles-service';

  async onMessage(data: UserCreatedEvent['data'], msg: Message) {
    const { _id, firstname, lastname, email } = data;
    const user = User.build({
      _id: _id,
      email: email,
      lastname: lastname,
      firstname: firstname,
    });
    await user.save();

    const profile = Profile.build({
      _id: _id,
      user: user,
      age: '',
      birthdate: '',
      aboutMe: '',
      profilePhoto: '',
      createdAt: new Date(Date.now()).toString(),
      hobbys: [''],
      hometown: '',
      school: '',
      profession: '',
      experiences: [{ description: 'Description', title: 'REACT' }],
      currentJob: '',
      phoneNumber: '',
    });
    await profile.save();
    console.log(user);
    console.log(profile);
    msg.ack();
  }
}
