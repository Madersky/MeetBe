import React, { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

const Details = ({
  isDetailsOpen,
  setIsDetailsOpen,
  profile,
  setIsButtonOpen,
}) => {
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

  const onDetailClose = () => {
    setIsButtonOpen(true);
    setIsDetailsOpen(!isDetailsOpen);
  };

  return (
    <AnimatePresence>
      {isDetailsOpen && (
        <motion.div
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`basic-info__section-basic`}
        >
          {paragraphHiddenList}
          <button onClick={onDetailClose}>Close</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Details;
