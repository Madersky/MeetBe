import { useState, useEffect, useRef } from 'react';
import Router from 'next/router';

import { Experience } from '../../components/profiles/experience/Experience';
import { CustomExperience } from '../../components/accordion/customExperience';
import EditProfile from '../../components/profiles/EditProfile';
import Hobbys from '../../components/profiles/hobbys/Hobbys';
import ImagePanel from '../../components/profiles/ImagePanel';

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
      <p key={Math.random(profile._id)}>
        {`${text.slice(0, 1).toUpperCase() + text.slice(1)} : ${
          profile[`${fieldName}`] ? profile[`${fieldName}`] : ''
        }`}
      </p>
    );
  });
  return (
    <div className="profile">
      <div className="profile__container">
        <div className="profile__basic-info">
          <ImagePanel
            profile={profile || 'profile.jpg'}
            currentUser={currentUser}
          />
          <div className="profile__basic-info-section-basic">
            <p className="">Firstname: {profile.user.firstname}</p>
            <p className="">Lastname: {profile.user.lastname}</p>
            <p className="">Email: {profile.user.email} </p>

            <button
              className=""
              type="button"
              onClick={() => setIsOpen(!isOpen)}
            >
              {`${isOpen ? 'View more info' : 'close'}`}
            </button>
          </div>
          <div className="profile__basic-info-section-details">
            <div
              className={`${
                isOpen ? 'profile__basic-info-section-details-collapse' : ''
              }`}
            >
              {paragraphHiddenList}
            </div>
          </div>
        </div>
        {/* <Experience
            experiences={profile.experiences}
            currentUser={currentUser}
          /> */}
        <div className="profile__experience">
          <CustomExperience
            experiences={profile.experiences}
            currentUser={currentUser}
          />
        </div>
        <div className="profile__hobbys">
          <Hobbys hobbys={hobbys} currentUser={currentUser} />{' '}
        </div>
        <div className="profile__edit-profile">
          <EditProfile profile={profile} currentUser={currentUser} />{' '}
        </div>
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
