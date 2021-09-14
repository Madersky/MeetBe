import { useState, useEffect, useRef } from 'react';
import CustomInput from '../CustomInput';

export const CreateAccordionSection = ({ onCreateClick }) => {
  const [addMode, setAddMode] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [newAccordion, setNewAccordion] = useState({});
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      onCreateClick({ ...newAccordion }, 'create');
    }
  }, [newAccordion]);
  const onFromSubmit = (e) => {
    e.preventDefault();
    setNewAccordion({ title, description });
  };

  return (
    <div className="text-center">
      <div className={`${addMode ? '' : 'collapse'} text-start mt-3`}>
        <form onSubmit={onFromSubmit}>
          <CustomInput
            name="Add Title"
            id="description"
            type="textarea"
            className="input-group mb-3"
            value={title}
            setter={setTitle}
            placeholder="FrontEnd"
            // Bellow is not working, to fixed
            //  error={
            //    createExperienceErrors && createExperienceErrors.message['title']
            //  }
          />
          <CustomInput
            name="Add description"
            id="description"
            type="textarea"
            className="input-group mb-3"
            value={description}
            setter={setDescription}
            placeholder="I was learning this for about 5 years"
            // Bellow is not working, to fixed
            // error={
            //   createExperienceErrors &&
            //   createExperienceErrors.message['description']
            // }
          />
          <button className="btn btn-primary">Click to create section</button>
        </form>
      </div>
      <button className="btn btn-muted" onClick={() => setAddMode(!addMode)}>
        {addMode ? <p>close</p> : <i className="bi bi-plus-circle"></i>}
      </button>
    </div>
  );
};
