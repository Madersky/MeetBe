import { useState } from 'react';

import useRequest from '../hooks/use-request';

const EditProfile = ({ profile, userId }) => {
  const [age, setAge] = useState('');
  const [school, setSchool] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [message, setMessage] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [hometown, setHometown] = useState('');
  const [profession, setProfession] = useState('');
  const [currentJob, setCurrentJob] = useState('');
  const [socialStatus, setSocialStatus] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [hobbys, setHobbys] = useState('');
  const [interests, setInterests] = useState('');

  const [patchProfileRequest, patchProfilesErrors] = useRequest({
    url: `/api/profiles/id/${userId}`,
    method: 'patch',
    body: {
      age: age || profile.age,
      school: school || profile.school,
      birthdate: birthdate || profile.birthdate,
      message: message || profile.message,
      profilePhoto: profilePhoto || profile.profilePhoto,
      hometown: hometown || profile.hometown,
      profession: profession || profile.profession,
      currentJob: currentJob || profile.currentJob,
      socialStatus: socialStatus || profile.socialStatus,
      phoneNumber: phoneNumber || profile.phoneNumber,
      hobbys: hobbys || profile.hobbys,
      interests: interests || profile.interests,
    },
    onSuccess: () => {
      console.log('profile updated');
      Router.reload();
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    patchProfileRequest();
  };

  const fieldNames = Object.keys(profile);
  console.log(fieldNames);

  const formList = fieldNames.map((fieldName, num) => {
    // STRING W PRZYPADKU GDY W ŚRODKU BYŁA WIELKA LITERA
    // CO ŚWIADCZY O PODZIELENIU STRINGA SPACJĄ
    const text = fieldName.split(/(?=[A-Z])/).join(' ');

    return fieldName === 'user' ||
      fieldName === '_id' ||
      fieldName === 'version' ||
      fieldName === 'hobbys' ||
      fieldName === 'interests' ? null : (
      <div key={num}>
        <label className="form-label" htmlFor={fieldName.toLowerCase()}>
          {/* TWORZENIE WILEKIEJ LITERY NA POCZĄTKU STRINGA */}
          {`${text.slice(0, 1).toUpperCase() + text.slice(1)}`}
        </label>
        <div className="input-group mb-3">
          <input
            id={fieldName.toLowerCase()}
            type="text"
            className="form-control"
            aria-label={fieldName.toLowerCase()}
            aria-describedby="basic-addon1"
          ></input>
        </div>
      </div>
    );
  });
  return (
    <div className="container">
      <form onSubmit={onSubmit} id="form1">
        {formList}
      </form>
      <div className="text-center">
        <button
          className="btn btn-primary text-center"
          type="submit"
          form="form1"
        >
          Click to edit
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
