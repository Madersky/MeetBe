import { Request, Response, NextFunction } from 'express';

import { natsWrapper } from '../nats-wrapper';
import { ProfileUpdatePublisher } from '../events/publishers/profile-update-publisher';
import { Profile } from '../models/profile';
import { User } from '../models/user';
import { BadRequestError } from '@meetbe/common';

exports.createProfile = async (req: Request, res: Response) => {
  console.log('CREATING PROFILE');
  const {
    message,
    age,
    birthDate,
    profilePhoto,
    hobbys,
    interests,
    hometown,
    school,
    profession,
    currentJob,
    socialStatus,
    phoneNumber,
  } = req.body;

  const existingProfile = await Profile.findById(req.currentUser!._id);
  // userID: req.currentUser!.id,

  if (existingProfile) {
    throw new BadRequestError('Profile already created');
  }
  const user = await User.findById(req.currentUser!._id);

  if (!user) {
    throw new Error('User not found');
  }
  const profile = Profile.build({
    _id: user._id,
    user: user,
    age: age,
    birthDate: birthDate,
    message: message,
    profilePhoto: profilePhoto,
    createdAt: new Date(Date.now()).toString(),
    hobbys: hobbys,
    interests: interests,
    hometown: hometown,
    school: school,
    profession: profession,
    currentJob: currentJob,
    socialStatus: socialStatus,
    phoneNumber: phoneNumber,
  });

  console.log(profile);

  await profile.save();

  // new ProfileCreatedPublisher(client).publish({
  //   id: profile.id,
  //   firstName: profile.firstName,
  //   lastName : profile.lastName,
  //   age: profile.age,
  //   userId: profile.userId
  // })

  res.status(201).send({ profile: profile || null });
};

exports.getAllProfiles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUsers = await User.find();
    const allProfiles = await Profile.find().populate('user');
    // const allUsers = await User.find();
    res
      .status(200)
      .send({ profiles: allProfiles || null, users: allUsers || null });
  } catch (err) {
    res.status(404).send(`ERROR!! ${err}`);
  }
};

exports.getProfileByUserId = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findById(req.params._id).populate('user');
    res.status(200).send({ profile: profile });
  } catch (err) {
    res.status(404).send(`ERRROR! ${err}`);
  }
};

exports.getProfileByEmail = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.where('email').equals(req.params.email);
    res.status(200).send({ profile: profile || null });
  } catch (err) {
    res.status(404).send(`ERROR! ${err}`);
  }
};

exports.patchProfile = async (req: Request, res: Response) => {
  try {
    // const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    // TESTING
    await Profile.findById(req.params._id)
      .populate('user')
      .exec(async function (err, profile) {
        if (err) {
          throw new Error(`${err}`);
        }
        const user = await User.findByIdAndUpdate(
          profile!.user._id,
          req.body.user
        );
        delete req.body.user;
        await profile!.update(req.body);
        await user?.save();
        await profile?.save();
        res.status(200).send({ user: user || null, profile: profile || null });
      });

    // OLD APPROACH
    // let profile = await Profile.findById(req.params.id).populate('user');
    // if (!profile) {
    //   throw new Error('Profile not found');
    // }
    // let { user } = profile;
    // user = req.body.user;
    // profile.user = user;

    // profile.markModified('user');
    // profile.update(req.body);
    // console.log(profile);
    // await profile.save();

    // await new ProfileUpdatePublisher(natsWrapper.client).publish({
    //   user: profile.user,
    //   age: profile.age,
    //   birthDate: profile.birthDate,
    //   message: profile.message,
    //   profilePhoto: profile.profilePhoto,
    //   createdAt: profile.createdAt,
    //   hobbys: profile.hobbys,
    //   interests: profile.interests,
    //   hometown: profile.hometown,
    //   school: profile.school,
    //   profession: profile.profession,
    //   currentJob: profile.currentJob,
    //   socialStatus: profile.socialStatus,
    //   phoneNumber: profile.phoneNumber,
    //   version: profile.version,
    // });
    // res.status(200).send({ profile: profile || null });
  } catch (err) {
    res.status(404).send(`ERROR! ${err}`);
  }
};
