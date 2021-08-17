import { Subjects } from '@meetbe/common';
import { Publisher } from '@meetbe/common';
import { UserCreatedEvent } from '@meetbe/common';
export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
  readonly subject = Subjects.UserCreated;
}
