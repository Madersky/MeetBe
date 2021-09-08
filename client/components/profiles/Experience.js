import UseRequest from '../../hooks/use-request';
import CustomInput from '../CustomInput';
import { useState } from 'react';

export const Experience = ({ experiences, currentUser }) => {
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [acceptedDescription, setAcceptedDescription] = useState([]);
  const [headingOneIsOpen, setHeadingOneIsOpen] = useState(true);
  const [headingSecondIsOpen, setHeadingSecondIsOpen] = useState(true);

  const [patchExperienceRequest, patchExperienceErrors] = UseRequest({
    url: `/api/profiles/id/${currentUser._id}`,
    method: 'patch',
    body: {
      experiences: [
        {
          description,
          title,
        },
      ],
    },
    onSuccess: (responseData) => {},
  });

  // UPDATE EXPERIENCE HELPER FUNCTION

  //   const onFormSubmit = (e) => {
  //     e.preventDefault();
  //     patchExperienceRequest();
  //     setAcceptedDescription([description, title]);
  //   };

  // NIE DZIAŁA DLA WIELU ACCORDIONÓW, ZROBIĆ COMPONENT ACCORDION

  const accordionList = experiences.map((experience) => {
    return (
      <div key={experience.description} className="mt-1">
        <button
          className="btn btn-primary ms-5 "
          onClick={() => setHeadingSecondIsOpen(!headingSecondIsOpen)}
        >
          {experience.title}
        </button>
        <div
          id="collapseOne"
          className={`${headingSecondIsOpen ? 'collapse' : ''}`}
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExperience"
        >
          <div className="accordion-body">{experience.description}</div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <h3>This is EXPERIENCE Component</h3>
      {/* ACCORDION */}

      <div className="border border-dark">
        {/* Pierwszy accordion */}
        {accordionList}
      </div>
      {/* UPDATE EXPERIENCE FORM */}
      {/* <form>
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
            patchExperienceErrors && patchExperienceErrors.message['title']
          }
        />
        <button className="btn btn-primary" onClick={onFormSubmit}>
          Click me to submit the form
        </button>
      </form> */}
    </div>
  );
};
