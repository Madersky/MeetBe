import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Details from './Details';
import ImagePanel from './ImagePanel';

const BasicInfo = ({ profile, currentUser }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isButtonOpen, setIsButtonOpen] = useState(true);

  const onViewMoreClick = () => {
    setIsDetailsOpen(!isDetailsOpen);
    setIsButtonOpen(!isButtonOpen);
  };

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

        <AnimatePresence>
          {isButtonOpen && (
            <motion.button
              exit={{ opacity: 0 }}
              type="button"
              onClick={onViewMoreClick}
            >
              View More
            </motion.button>
          )}
        </AnimatePresence>
        <Details
          isDetailsOpen={isDetailsOpen}
          setIsDetailsOpen={setIsDetailsOpen}
          setIsButtonOpen={setIsButtonOpen}
          profile={profile}
        />
      </div>
    </div>
  );
};

export default BasicInfo;
