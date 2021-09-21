import Accordion from './Accordion';
import { useState, useEffect, useRef, useReducer } from 'react';
import UseRequest from '../../hooks/use-request';

export const CustomExperience = ({ experiences, currentUser }) => {
  const [activeExperiences, setActiveExperiences] = useState(experiences);
  // const [requestData, setRequestData] = useState({});
  // const [requestType, setRequestType] = useState('');

  const [request, dispatch] = useReducer(
    (state, action) => {
      return action;
    },
    { data: {}, title: '' }
  );
  const [deleteExperienceRequest, deleteExperienceErrors] = UseRequest({
    url: `/api/profiles/id/${currentUser._id}`,
    method: 'put',
    body: {
      tab: 'experiences',
      value: {
        title: request.data.title,
      },
    },
    onSucces: (responseData) => {},
  });

  const [patchExperienceRequest, patchExperienceErrors] = UseRequest({
    url: `/api/profiles/${currentUser._id}/experience`,
    method: 'patch',
    body: {
      experience: {
        description: request.data.description,
        title: request.data.title,
      },
      oldTitle: request.data.oldTitle,
    },
    onSuccess: (responseData) => {},
  });

  const [createExperienceRequest, createExperienceErrors] = UseRequest({
    url: `/api/profiles/${currentUser._id}/experience`,
    method: 'post',
    body: {
      experience: {
        description: request.data.description,
        title: request.data.title,
      },
    },
    onSuccess: (responseData) => {},
  });

  const doRequest = (data, type) => {
    // setRequestData(data);
    // setRequestType(type);
    dispatch({ data: data, type: type });
    // console.log('doREqyest');
  };

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      // EXAMPLE WITH useReducer
      if (request.type === 'delete') {
        deleteExperienceRequest();
        const newExperiences = activeExperiences.filter(
          (experience) => experience != request.data
        );
        console.log('To jest newExperiences po delete', newExperiences);
        setActiveExperiences([...newExperiences]);
      } else if (request.type === 'update') {
        patchExperienceRequest();
        const newExperiences = activeExperiences.map((experience) => {
          if (experience.title === request.data.oldTitle) {
            delete request.data.oldTitle;
            return request.data;
          } else {
            return experience;
          }
        });
        console.log('To jest newExperiences po update', newExperiences);
        setActiveExperiences([...newExperiences]);
      } else if (request.type === 'create') {
        createExperienceRequest();
        const newExperiences = [
          ...activeExperiences,
          { title: request.data.title, description: request.data.description },
        ];
        console.log('To jest newExperiences po create', newExperiences);
        setActiveExperiences(newExperiences);
      }
      // EXAMPLE WITH useState
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
  }, [request]);

  const accordionList = activeExperiences.map((experience, index) => {
    return (
      <div className=" m-4" key={experience.title}>
        {index === activeExperiences.length - 1 ? (
          <Accordion
            data={experience}
            editDisplay={true}
            doRequest={doRequest}
            addDisplay={true}
          />
        ) : (
          <Accordion
            data={experience}
            editDisplay={true}
            doRequest={doRequest}
            addDisplay={false}
          />
        )}
      </div>
    );
  });
  return (
    <div className="row border">
      <h3 className="p-2">EXPERIENCE </h3>
      <div className="">
        {accordionList.length !== 0 ? (
          accordionList
        ) : (
          <Accordion data={null} doRequest={doRequest} />
        )}
      </div>
      {/* UPDATE EXPERIENCE FORM */}
    </div>
  );
};
