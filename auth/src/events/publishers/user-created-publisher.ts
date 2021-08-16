import { Publisher, UserCreatedEvent, Subjects } from "@meetbe/common";

export class userCreatedPublisher extends Publisher<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
}
