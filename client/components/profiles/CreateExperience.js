import UseRequest from '../../hooks/use-request';
import CustomInput from '../CustomInput';

import { useState, useEffect, useRef } from 'react';
import Router from 'next/router';

// TO SAMO CO W EditProfile, małe zmiany, możliwy refactor
export const CreateExperience = ({ currentUser, onCreateClick }) => {
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [experience, setExperience] = useState({});
  const [createdExperiences, setCreatedExperiences] = useState([]);
  const [createExperienceRequest, createExperienceErrors] = UseRequest({
    url: `/api/profiles/experience/${currentUser._id}`,
    method: 'post',
    body: {
      experience: {
        description,
        title,
      },
    },
    onSuccess: (responseData) => {},
  });

  const isInitialMount = useRef(true);
  const onFormSubmit = (e) => {
    e.preventDefault();
    createExperienceRequest();
    setExperience({ description: description, title: title });
  };
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setCreatedExperiences([...createdExperiences, experience]);
    }
  }, [experience]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      onCreateClick(createdExperiences);
    }
  }, [createdExperiences]);

  return (
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
        error={
          createExperienceErrors &&
          createExperienceErrors.message['description']
        }
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
        error={
          createExperienceErrors && createExperienceErrors.message['title']
        }
      />
      <button
        className="btn btn-primary"
        disabled={title && description ? null : 'disabled'}
        onClick={onFormSubmit}
      >
        Click me to submit the form
      </button>
    </form>
  );
};
