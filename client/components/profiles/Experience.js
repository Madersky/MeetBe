import Accordion from '../Accordion';
import { EditExperience } from './EditExperience';
import { CreateExperience } from './CreateExperience';
import { useState } from 'react';

export const Experience = ({ experiences, currentUser }) => {
  const [addMode, setAddMode] = useState(false);
  const [activeExperiences, setActiveExperiences] = useState(experiences);

  const onCreateClick = (createdExperiences) => {
    setActiveExperiences([...experiences, ...createdExperiences]);
  };
  const accordionList = activeExperiences.map((experience, id) => {
    return (
      <div key={experience.title}>
        <div className="row justify-content-end">
          <div className="col-lg-6">
            <Accordion
              title={experience.title}
              description={experience.description}
            />
          </div>
          <div className="col-lg-6 ">
            <EditExperience experience={experience} currentUser={currentUser} />
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <h3>This is EXPERIENCE Component</h3>
      <div className="border border-dark">{accordionList}</div>
      {/* UPDATE EXPERIENCE FORM */}
      <button className="btn btn-muted" onClick={() => setAddMode(!addMode)}>
        <i className="bi bi-plus-circle" />
      </button>
      <div className={`${addMode ? '' : 'collapse'}`}>
        <CreateExperience
          currentUser={currentUser}
          onCreateClick={onCreateClick}
        />
      </div>
    </div>
  );
};
