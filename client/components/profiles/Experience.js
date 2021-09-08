import UseRequest from '../../hooks/use-request';
import CustomInput from '../CustomInput';
import { useState } from 'react';

export const Experience = ({ experience, currentUser }) => {
  const [description, setDescription] = useState('');
  const [acceptedDescription, setAcceptedDescription] = useState('');

  const [patchExperienceRequest, patchExperienceErrors] = UseRequest({
    url: `/api/profiles/id/${currentUser._id}`,
    method: 'patch',
    body: {
      experience: {
        description,
      },
    },
    onSuccess: (responseData) => {},
  });

  const onFormSubmit = (e) => {
    e.preventDefault();
    patchExperienceRequest();
    setAcceptedDescription(description);
  };
  return (
    <div>
      <h3>This is EXPERIENCE Component</h3>
      <p className="lead">{acceptedDescription}</p>
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
            patchExperienceErrors &&
            patchExperienceErrors.message['description']
          }
        />
        <button className="btn btn-primary" onClick={onFormSubmit}>
          Click me to submit the form
        </button>
      </form>
    </div>
  );
};
