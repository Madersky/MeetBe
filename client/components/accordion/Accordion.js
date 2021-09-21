import { useState } from 'react';
import { EditAccordionSection } from './EditAccordionSection';
import { CreateAccordionSection } from './CreateAccordionSection';
// doRequest funkcja która bubluje do parenta i w parencie powinien być request
const Accordion = ({ data, editDisplay, doRequest, addDisplay }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [accordionTitle, setAccordionTitle] = useState(data.title);
  // const [accordionDescription, setAccordionDescription] = useState(
  //   data.description
  // );

  const onEditClick = (editData, type) => {
    doRequest(editData, type);
  };
  const onCreateClick = (data, type) => {
    doRequest(data, type);
  };
  const onDeleteClick = () => {
    doRequest(data, 'delete');
  };
  return data ? (
    <div>
      <div className="row">
        <div className="col-6">
          <button
            className="btn btn-primary "
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            {data && data.title}
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
              {data && data.description}
            </div>
            <EditAccordionSection
              editDisplay={editDisplay}
              onEditClick={onEditClick}
              data={data}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          {addDisplay ? (
            <CreateAccordionSection onCreateClick={onCreateClick} />
          ) : null}
        </div>
      </div>
    </div>
  ) : (
    <CreateAccordionSection onCreateClick={onCreateClick} />
  );
};

export default Accordion;
