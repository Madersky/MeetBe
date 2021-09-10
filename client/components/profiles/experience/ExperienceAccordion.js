import { useState } from 'react';

import { EditExperience } from './EditExperience';

const Accordion = ({ title, description, experience, currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="row">
      <button
        className="btn btn-primary col-6"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {title}
      </button>
      <div className={`row  align-items-center ${isOpen ? '' : 'collapse'}`}>
        <div className=" col-lg-12 mt-3 ">
          <div className=" container border mb-3 p-2 rounded">
            {description}
          </div>
          <EditExperience experience={experience} currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default Accordion;
