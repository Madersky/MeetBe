const Accordion = ({ setIsOpen, isOpen, title, description }) => {
  return (
    <div className="mt-1">
      <button
        className="btn btn-primary ms-5 "
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </button>
      <div className={`${isOpen ? 'collapse' : ''}`}>
        <div className="accordion-body">{description}</div>
      </div>
    </div>
  );
};

export default Accordion;
