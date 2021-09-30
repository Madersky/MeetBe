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

  // const basicVariants = {
  //   open: { height: 'auto' },
  //   closed: { height: 'auto', opacity: 1, backgroundColor: 'red' },
  // };

  return (
    <motion.div
      className="basic-info"
      transition={{ duration: 1 }}
      // variants={basicVariants}
      // initial=''
      // animate="closed"
    >
      <div className="basic-info__section-photo">
        <ImagePanel
          profile={profile || 'profile.jpg'}
          currentUser={currentUser}
        />
      </div>
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
      </div>
      <div className="basic-info__section-details">
        <Details
          isDetailsOpen={isDetailsOpen}
          setIsDetailsOpen={setIsDetailsOpen}
          setIsButtonOpen={setIsButtonOpen}
          profile={profile}
        />
      </div>
    </motion.div>
  );
};

export default BasicInfo;
