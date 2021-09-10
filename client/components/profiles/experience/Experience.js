import Accordion from './ExperienceAccordion';
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
      <div className=" m-4" key={experience.title}>
        {/* <div className="row">
          <div className="col-3"> */}
        <Accordion
          title={experience.title}
          description={experience.description}
          experience={experience}
          currentUser={currentUser}
        />
        {/* </div>
        </div> */}
      </div>
    );
  });

  return (
    <div className="row border">
      <h3 className="p-2">EXPERIENCE </h3>
      <div className="">{accordionList}</div>
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
