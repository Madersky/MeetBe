import Accordion from './Accordion';
import { useState, useEffect, useRef } from 'react';
import UseRequest from '../../hooks/use-request';

export const CustomExperience = ({ experiences, currentUser }) => {
  const [activeExperiences, setActiveExperiences] = useState(experiences);
  const [requestData, setRequestData] = useState({});
  const [requestType, setRequestType] = useState('');

  const [deleteExperienceRequest, deleteExperienceErrors] = UseRequest({
    url: `/api/profiles/id/${currentUser._id}`,
    method: 'put',
    body: {
      tab: 'experiences',
      value: {
        title: requestData.title,
      },
    },
    onSucces: (responseData) => {},
  });

  const [patchExperienceRequest, patchExperienceErrors] = UseRequest({
    url: `/api/profiles/${currentUser._id}/experience`,
    method: 'patch',
    body: {
      experience: {
        description: requestData.description,
        title: requestData.title,
      },
      oldTitle: requestData.oldTitle,
    },
    onSuccess: (responseData) => {},
  });

  const doRequest = (data, type) => {
    setRequestData(data);
    setRequestType(type);
    console.log('doREqyest');
  };

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      //   if (requestType === 'delete') {
      //     deleteExperienceRequest();
      //     const newExperiences = activeExperiences.filter(
      //       (experience) => experience != requestData
      //     );
      //     setActiveExperiences([...newExperiences]);
      //   } else if (requestType === 'update') {
      //     patchExperienceRequest();
      //     const newExperiences = activeExperiences.map((experience) => {
      //       if (experience.title === requestData.oldTitle) {
      //         delete requestData.oldTitle;
      //         return requestData;
      //       } else {
      //         return experience;
      //       }
      //     });
      //     console.log(newExperiences);
      //     setActiveExperiences([...newExperiences]);
      //   }
    }
  }, [requestData]);

  const accordionList = activeExperiences.map((experience) => {
    return (
      <div className=" m-4" key={experience.title}>
        <Accordion data={experience} editDisplay={true} doRequest={doRequest} />
      </div>
    );
  });
  return (
    <div className="row border">
      <h3 className="p-2">EXPERIENCE </h3>
      <div className="">{accordionList}</div>
      {/* UPDATE EXPERIENCE FORM */}
    </div>
  );
};
