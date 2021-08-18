import mongoose from 'mongoose';

interface UserAttrs {
  id: string;
  email: string;
  username: string;
}

export interface UserDoc extends mongoose.Document {
  email: string;
  username: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: false,
    },
    username: {
      type: String,
      require: false,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret.id;
      },
    },
  }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User({
    _id: attrs.id,
    email: attrs.email,
    username: attrs.username,
  });
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
