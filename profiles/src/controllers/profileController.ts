import { Request, Response, NextFunction } from 'express';

import { natsWrapper } from '../nats-wrapper';
import { ProfileUpdatePublisher } from '../events/publishers/profile-update-publisher';
import { Profile } from '../models/profile';
import { User } from '../models/user';
import { BadRequestError } from '@meetbe/common';

exports.createProfile = async (req: Request, res: Response) => {
  console.log('CREATING PROFILE');
  const {
    aboutMe,
    age,
    birthdate,
    profilePhoto,
    hobbys,
    hometown,
    school,
    profession,
    currentJob,
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
    birthdate: birthdate,
    aboutMe: aboutMe,
    profilePhoto: profilePhoto,
    createdAt: new Date(Date.now()).toString(),
    hobbys: hobbys,
    hometown: hometown,
    school: school,
    profession: profession,
    currentJob: currentJob,
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
    // console.log('JESTEM W REQUESCIE');
    const newObj: Record<string, any> = {};
    Object.keys(req.body).forEach((fieldName) => {
      if (req.body[fieldName] !== null) {
        newObj[fieldName] = req.body[fieldName];
      }
    });
    if (newObj.hobby !== null) {
      const hobby: [string] = newObj.hobby;
      delete newObj.hobby;
      const profile = await Profile.findByIdAndUpdate(
        req.params._id,
        {
          ...newObj,
          $addToSet: {
            hobbys: hobby,
          },
        },
        { new: true }
      );
      if (!profile) {
        throw new Error('Profile not found');
      }
      await profile.save();
      res.status(200).send({ profile: profile || null });
    } else {
      const profile = await Profile.findByIdAndUpdate(
        req.params._id,
        newObj,
        // {
        //   $push: { hobbys: req.body.hobbys},
        //   age: req.body.age,
        //   school: req.body.school,
        //   birthdate: req.body.birthdate,
        //   aboutMe: req.body.aboutMe,
        //   hometown: req.body.hometown,
        //   profession: req.body.profession,
        //   currentJob: req.body.currentJob,
        //   phoneNumber: req.body.phoneNumber,
        // },
        { new: true }
      );

      if (!profile) {
        throw new Error('Profile not found');
      }
      await profile.save();
      res.status(200).send({ profile: profile || null });
    }
  } catch (err) {
    res.status(404).send(`ERROR! ${err}`);
  }
};

exports.deleteProfileProperty = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findById(req.params._id);
    if (!profile) {
      throw new Error('Profile not found');
    }

    await profile.updateOne({
      $pull: { hobbys: req.body.hobby },
    });
    console.log(`Usunieto takie hobby: ${req.body.hobby}`);
    await profile.save();
    res.status(200).send({ profile: profile || null });
  } catch (err) {
    res.status(404).send(`ERROR! deleteProfileProperty ${err}`);
  }
};
