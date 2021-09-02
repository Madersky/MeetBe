import { useState } from 'react';
import Router from 'next/router';

import useRequest from '../../hooks/use-request';
import React from 'react';

const EditProfile = ({ profile, currentUser }) => {
  const [age, setAge] = useState('');
  const [school, setSchool] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [hometown, setHometown] = useState('');
  const [profession, setProfession] = useState('');
  const [currentJob, setCurrentJob] = useState('');
  const [socialStatus, setSocialStatus] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [patchProfileRequest, patchProfilesErrors] = useRequest({
    url: `/api/profiles/id/${currentUser._id}`,
    method: 'patch',
    body: {
      age: age || profile.age,
      school: school || profile.school,
      birthdate: birthdate || profile.birthdate,
      aboutMe: aboutMe || profile.aboutMe,
      profilePhoto: profilePhoto || profile.profilePhoto,
      hometown: hometown || profile.hometown,
      profession: profession || profile.profession,
      currentJob: currentJob || profile.currentJob,
      socialStatus: socialStatus || profile.socialStatus,
      phoneNumber: phoneNumber || profile.phoneNumber,
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
  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <label className="form-label" htmlFor="age">
          Age
        </label>
        <div className="input-group mb-3">
          <input
            id="age"
            type="text"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="18"
            aria-label="age"
            aria-describedby="basic-addon1"
          ></input>
        </div>
        <label className="form-label" htmlFor="school">
          School
        </label>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            placeholder="university"
            aria-label="School"
            aria-describedby="basic-addon1"
          ></input>
        </div>
        <label className="form-label" htmlFor="birthdate">
          Birthdate
        </label>
        <div className="input-group mb-3">
          <input
            type="data"
            className="form-control"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            placeholder="19.04.19999"
            aria-label="Birthdate"
            aria-describedby="basic-addon1"
          ></input>
        </div>
        <label className="form-label" htmlFor="about me">
          About me
        </label>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            placeholder="siema jestem kozak"
            aria-label="About"
            aria-describedby="basic-addon1"
          ></input>
        </div>
        <label className="form-label" htmlFor="hometown">
          Hometown
        </label>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={hometown}
            onChange={(e) => setHometown(e.target.value)}
            placeholder="Brzeg"
            aria-label="Hometown"
            aria-describedby="basic-addon1"
          ></input>
        </div>
        <label className="form-label" htmlFor="profession">
          Profession
        </label>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            placeholder="Programista"
            aria-label="Profession"
            aria-describedby="basic-addon1"
          ></input>
        </div>
        <label className="form-label" htmlFor="current job">
          Current Job
        </label>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={currentJob}
            onChange={(e) => setCurrentJob(e.target.value)}
            placeholder="Programista fullstack"
            aria-label="Current Job"
            aria-describedby="basic-addon1"
          ></input>
        </div>
        <label className="form-label" htmlFor="social status">
          Social status
        </label>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={socialStatus}
            onChange={(e) => setSocialStatus(e.target.value)}
            placeholder="engaged"
            aria-label="Social status"
            aria-describedby="basic-addon1"
          ></input>
        </div>
        <label className="form-label" htmlFor="phone number">
          Phone number
        </label>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="999999999"
            aria-label="Phone Number"
            aria-describedby="basic-addon1"
          ></input>
        </div>

        <button
          className="btn btn-primary text-center"
          // disabled={phoneNumber ? null : 'disabled'}
        >
          Click to edit
        </button>

        {patchProfilesErrors}
      </form>
    </div>
  );
};

export default EditProfile;
