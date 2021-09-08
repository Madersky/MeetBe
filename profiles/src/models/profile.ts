import mongoose from 'mongoose';
import { UserDoc, User } from './user';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface ProfileAttrs {
  _id: string;
  user: UserDoc;
  age: string;
  birthdate: string;
  aboutMe: string;
  profilePhoto?: any;
  createdAt: string;
  hobbys: [string];
  hometown: string;
  school: string;
  profession: string;
  // Type annotations EXAMPLE OF USES experience = [{description: "somesString"}]
  experience: { description: string };
  currentJob: string;
  phoneNumber: string;
}

interface ProfileModel extends mongoose.Model<ProfileDoc> {
  build(attrs: ProfileAttrs): ProfileDoc;
}

interface ProfileDoc extends mongoose.Document {
  user: UserDoc;
  age: string;
  birthdate: string;
  aboutMe: string;
  profilePhoto?: any;
  createdAt: string;
  hobbys: [string];
  hometown: string;
  school: string;
  profession: string;
  experience: { description: string };
  currentJob: string;
  phoneNumber: string;
  version: number;
}

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    aboutMe: {
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
    birthdate: {
      type: String,
      required: false,
    },
    hobbys: {
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
    experience: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },
    currentJob: {
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
        delete ret.__v;
      },
    },
  }
);

profileSchema.set('versionKey', 'version');
profileSchema.plugin(updateIfCurrentPlugin);
profileSchema.statics.build = (attrs: ProfileAttrs) => {
  return new Profile({
    _id: attrs._id,
    user: attrs.user,
    age: attrs.age,
    birthdate: attrs.birthdate,
    aboutMe: attrs.aboutMe,
    profilePhoto: attrs.profilePhoto,
    createdAt: new Date(Date.now()).toString(),
    hobbys: attrs.hobbys,
    hometown: attrs.hometown,
    school: attrs.school,
    profession: attrs.profession,
    experience: attrs.experience,
    currentJob: attrs.currentJob,
    phoneNumber: attrs.phoneNumber,
  });
};

const Profile = mongoose.model<ProfileDoc, ProfileModel>(
  'Profile',
  profileSchema
);

export { Profile };
