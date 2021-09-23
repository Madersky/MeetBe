import { useState, useEffect, useRef } from 'react';
import Router from 'next/router';

import { Experience } from '../../components/profiles/experience/Experience';
import { CustomExperience } from '../../components/accordion/customExperience';
import EditProfile from '../../components/profiles/EditProfile';
import Hobbys from '../../components/profiles/Hobbys';
import ImagePanel from '../../components/profiles/ImagePanel';
import UploadImage from '../../components/profiles/UploadImage';

const Profile = ({ profile, currentUser }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [editMode, setEditMode] = useState(false);

  // const isInitialMount = useRef(true);

  const hobbys = Array.from(profile.hobbys);

  let fieldNames = Object.keys(profile);
  const paragraphHiddenList = fieldNames.map((fieldName) => {
    // split(/(?=[A-Z])/) - wrzuca do tablicy po napotkaniu dużej litery
    const text = fieldName.split(/(?=[A-Z])/).join(' ');

    return fieldName === 'user' ||
      fieldName === '_id' ||
      fieldName === 'version' ||
      fieldName === 'hobbys' ||
      fieldName === 'experiences' ? null : (
      <p
        key={Math.random(profile._id)}
        className="lead text-start fw-bold px-5"
      >
        {`${text.slice(0, 1).toUpperCase() + text.slice(1)} : ${
          profile[`${fieldName}`] ? profile[`${fieldName}`] : ''
        }`}
      </p>
    );
  });
  return (
    <div className="profile">
      <div className="profile__container">
        <h1 className="">Profil</h1>

        {/* <ImagePanel profileImage={profile.profilePhoto || 'profile.jpg'} /> */}

        <div className="">
          <UploadImage />
          <p className="">Firstname: {profile.user.firstname}</p>
          <p className="">Lastname: {profile.user.lastname}</p>
          <p className="">Email: {profile.user.email} </p>
          <div className={`${isOpen ? 'collapse' : ''}`}>
            {paragraphHiddenList}
          </div>
          <div className="text-center">
            <button
              className=""
              type="button"
              onClick={() => setIsOpen(!isOpen)}
            >
              {`${isOpen ? 'View more info' : 'close'}`}
            </button>
          </div>
        </div>

        {/* <Experience
            experiences={profile.experiences}
            currentUser={currentUser}
          /> */}
        <CustomExperience
          experiences={profile.experiences}
          currentUser={currentUser}
        />

        <Hobbys hobbys={hobbys} currentUser={currentUser} />

        <p className="lead text-center pt-3">Edit profile</p>
        <EditProfile profile={profile} currentUser={currentUser} />
      </div>
    </div>
  );
};

Profile.getInitialProps = async (context, client, currentUser) => {
  const profileRes = await client.get(
    `api/profiles/id/${context.query.userId}`
  );
  // console.log(context.query.userId);
  // console.log('PROFILE RES CONSOLE LOG GET INITIAL PROPS', profileRes.data);

  return {
    ...profileRes.data,
    currentUser,
  };
};

export default Profile;
