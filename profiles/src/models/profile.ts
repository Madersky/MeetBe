import mongoose from 'mongoose';
import { UserDoc, User } from './user';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface ProfileAttrs {
  id: string;
  user: UserDoc;
  age: string;
  birthDate: string;
  message: string;
  profilePhoto?: any;
  createdAt: string;
  hobbys: [string];
  interests: [string];
  hometown: string;
  school: string;
  profession: string;
  currentJob: string;
  socialStatus: string;
  phoneNumber: string;
}

interface ProfileModel extends mongoose.Model<ProfileDoc> {
  build(attrs: ProfileAttrs): ProfileDoc;
}

interface ProfileDoc extends mongoose.Document {
  user: UserDoc;
  age: string;
  birthDate: string;
  message: string;
  profilePhoto?: any;
  createdAt: string;
  hobbys: [string];
  interests: [string];
  hometown: string;
  school: string;
  profession: string;
  currentJob: string;
  socialStatus: string;
  phoneNumber: string;
  version: number;
}

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    message: {
      type: String,
      required: false,
    },
    profilePhoto: {
      type: String,
      required: false,
    },
    createdAt: {
      type: String,
      default: Date.now(),
      select: false,
      required: true,
    },
    age: {
      type: Number,
      requided: false,
    },
    birthDate: {
      type: Date,
      required: false,
    },
    hobbys: {
      type: Array,
      required: false,
    },
    interests: {
      type: Array,
      required: false,
    },
    hometown: {
      type: String,
      required: false,
    },
    school: {
      type: String,
      required: false,
    },
    profession: {
      type: String,
      required: false,
    },
    currentJob: {
      type: String,
      required: false,
    },
    socialStatus: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
  },

  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

profileSchema.set('versionKey', 'version');
profileSchema.plugin(updateIfCurrentPlugin);
profileSchema.statics.build = (attrs: ProfileAttrs) => {
  return new Profile({
    id: attrs.id,
    user: attrs.user,
    age: attrs.age,
    birthDate: attrs.birthDate,
    message: attrs.message,
    profilePhoto: attrs.profilePhoto,
    createdAt: new Date(Date.now()).toString(),
    hobbys: attrs.hobbys,
    interests: attrs.interests,
    hometown: attrs.hometown,
    school: attrs.school,
    profession: attrs.profession,
    currentJob: attrs.currentJob,
    socialStatus: attrs.socialStatus,
    phoneNumber: attrs.phoneNumber,
  });
};

const Profile = mongoose.model<ProfileDoc, ProfileModel>(
  'Profile',
  profileSchema
);

export { Profile };
