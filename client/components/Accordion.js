import { useState } from 'react';
const Accordion = ({ title, description }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mt-1">
      <button
        className="btn btn-primary ms-5 "
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {title}
      </button>
      <div className={`${isOpen ? '' : 'collapse'}`}>
        <div className="accordion-body">{description}</div>
      </div>
    </div>
  );
};

export default Accordion;
