import { useState } from 'react';
import { EditAccordion } from './EditAccordion';
// doRequest funkcja która bubluje do parenta i w parencie powinien być request
const Accordion = ({ data, editDisplay, doRequest }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [accordionTitle, setAccordionTitle] = useState(data.title);
  const [accordionDescription, setAccordionDescription] = useState(
    data.description
  );

  const onEditClick = (editData, type) => {
    doRequest(editData, type);
  };
  const onDeleteClick = () => {
    doRequest(data, 'delete');
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
          <EditAccordion
            editDisplay={editDisplay}
            onEditClick={onEditClick}
            data={data}
          />
        </div>
      </div>
    </div>
  );
};

export default Accordion;
