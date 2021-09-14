import CustomInput from '../CustomInput';

import { useState, useEffect, useRef } from 'react';

export const EditAccordionSection = ({ editDisplay, onEditClick, data }) => {
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [newAccordion, setNewAccordion] = useState({});

  const onFormSubmit = (e) => {
    e.preventDefault();
    setNewAccordion({ title, description });
  };

  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      onEditClick({ ...newAccordion, oldTitle: data.title }, 'update');
    }
  }, [newAccordion]);
  return editDisplay ? (
    <div>
      <button
        className="btn btn-secondary"
        onClick={() => setEditMode(!editMode)}
      >
        Click to edit
      </button>
      <div className={`${editMode ? '' : 'collapse'}`}>
        <form>
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
            //   patchExperienceErrors &&
            //   patchExperienceErrors.message['description']
            // }
          />
          <CustomInput
            name="Add Title"
            id="description"
            type="textarea"
            className="input-group mb-3"
            value={title}
            setter={setTitle}
            placeholder="FrontEnd"
            // Bellow is not working, to fixed
            // error={
            //   patchExperienceErrors && patchExperienceErrors.message['title']
            // }
          />
          <button
            className="btn btn-primary"
            disabled={title && description ? null : 'disabled'}
            onClick={onFormSubmit}
          >
            Click me to submit the form
          </button>
        </form>
      </div>
    </div>
  ) : (
    ''
  );
};
