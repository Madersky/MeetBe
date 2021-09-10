import { useState } from 'react';
import UseRequest from '../../../hooks/use-request';
import { EditExperience } from './EditExperience';

const Accordion = ({ experience, currentUser, deleteAccordion }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [accordionTitle, setAccordionTitle] = useState(experience.title);
  const [accordionDescription, setAccordionDescription] = useState(
    experience.description
  );
  const [deleteAccordionRequest, deleteAccordionErrors] = UseRequest({
    url: `/api/profiles/id/${currentUser._id}`,
    method: 'put',
    body: {
      tab: 'experiences',
      value: {
        title: accordionTitle,
      },
    },
    onSuccess: () => {},
  });

  const onDeleteClick = () => {
    deleteAccordionRequest();
    deleteAccordion(experience);
  };
  return (
    <div className="row">
      <div className="col-6">
        <button
          className="btn btn-primary "
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {accordionTitle}
        </button>
        {deleteAccordionErrors}
      </div>
      <div className="col-1">
        <button className="btn btn-muted" onClick={onDeleteClick}>
          <i className="bi bi-patch-minus" />
        </button>
      </div>
      <div className={`row  align-items-center ${isOpen ? '' : 'collapse'}`}>
        <div className=" col-lg-12 mt-3 ">
          <div className=" container border mb-3 p-2 rounded">
            {accordionDescription}
          </div>
          <EditExperience experience={experience} currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default Accordion;
