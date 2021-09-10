import Accordion from './ExperienceAccordion';
import { EditExperience } from './EditExperience';
import { CreateExperience } from './CreateExperience';
import { useState, useRef, useEffect } from 'react';

export const Experience = ({ experiences, currentUser }) => {
  const [addMode, setAddMode] = useState(false);
  const [activeExperiences, setActiveExperiences] = useState(experiences);

  const createAccordion = (createdExperiences) => {
    console.log('experience', experiences);
    console.log('created', createdExperiences);
    setActiveExperiences([...activeExperiences, ...createdExperiences]);
  };

  const deleteAccordion = (chosenExperience) => {
    const newExperiences = activeExperiences.filter(
      (experience) => experience != chosenExperience
    );
    setActiveExperiences(newExperiences);
  };

  const accordionList = activeExperiences.map((experience, id) => {
    return (
      <div className=" m-4" key={experience.title}>
        {/* <div className="row">
          <div className="col-3"> */}
        <Accordion
          experience={experience}
          currentUser={currentUser}
          deleteAccordion={deleteAccordion}
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
          createAccordion={createAccordion}
        />
      </div>
    </div>
  );
};
