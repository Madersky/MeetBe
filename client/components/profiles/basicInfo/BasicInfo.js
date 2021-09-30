import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import ImagePanel from './ImagePanel';

const BasicInfo = ({ profile, currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  let fieldNames = Object.keys(profile);
  const paragraphHiddenList = fieldNames.map((fieldName) => {
    // split(/(?=[A-Z])/) - wrzuca do tablicy po napotkaniu dużej litery
    const text = fieldName.split(/(?=[A-Z])/).join(' ');

    return fieldName === 'user' ||
      fieldName === '_id' ||
      fieldName === 'version' ||
      fieldName === 'hobbys' ||
      fieldName === 'experiences' ||
      fieldName === 'profilePhoto' ? null : (
      <p key={Math.random(profile._id)} className="basic-info__text">
        {`${text.slice(0, 1).toUpperCase() + text.slice(1)} : ${
          profile[`${fieldName}`] ? profile[`${fieldName}`] : ''
        }`}
      </p>
    );
  });

  return (
    <div className="basic-info">
      <ImagePanel
        profile={profile || 'profile.jpg'}
        currentUser={currentUser}
      />
      <div className="basic-info__section-basic">
        <p className="basic-info__text">Firstname: {profile.user.firstname}</p>
        <p className="basic-info__text">Lastname: {profile.user.lastname}</p>
        <p className="basic-info__text">Email: {profile.user.email} </p>

        <button className="" type="button" onClick={() => setIsOpen(!isOpen)}>
          {`${isOpen ? 'close' : 'View more info'}`}
        </button>
      </div>
      {isOpen && (
        <div
          className={`basic-info__section-details`}
          style={isOpen ? { display: 'flex' } : { display: 'none' }}
        >
          <div
            className={`${
              isOpen ? 'basic-info__section-details__collapse' : ''
            }`}
          >
            {paragraphHiddenList}
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicInfo;
