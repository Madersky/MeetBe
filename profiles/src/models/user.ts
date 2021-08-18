import mongoose from 'mongoose';

interface UserAttrs {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
}

export interface UserDoc extends mongoose.Document {
  email: string;
  firstname: string;
  lastname: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
    },
    firstname: {
      type: String,
      require: true,
    },
    lastname: {
      type: String,
      require: true,
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
    firstname: attrs.firstname,
    lastname: attrs.lastname,
  });
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
