import { useState } from 'react';
<<<<<<< HEAD
import Router from 'next/router';

import useRequest from '../hooks/use-request';
import React from 'react';
import Profile from '../pages/profiles/[userId]';

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
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="siema jestem kozak"
            aria-label="About"
            aria-describedby="basic-addon1"
          ></input>
        </div>
        <label className="form-label" htmlFor="hobbys">
          Hobbys
        </label>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={hobbys}
            onChange={(e) => setHobbys(e.target.value)}
            placeholder="programowanie"
            aria-label="Hobbys"
            aria-describedby="basic-addon1"
          ></input>
        </div>
        <label className="form-label" htmlFor="interests">
          Interests
        </label>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="programowanie"
            aria-label="Interests"
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
=======
const EditProfile = ({ profile }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log('onSubmit');
  };
  const fieldNames = Object.keys(profile);

  const formList = fieldNames.map((fieldName, num) => {
    // STRING W PRZYPADKU GDY W ŚRODKU BYŁA WIELKA LITERA
    // CO ŚWIADCZY O PODZIELENIU STRINGA SPACJĄ
    const text = fieldName.split(/(?=[A-Z])/).join(' ');

    return fieldName === 'user' ||
      fieldName === '_id' ||
      fieldName === 'version' ? null : (
      <div key={num}>
        <label className="form-label" htmlFor={fieldName.toLowerCase()}>
          {/* TWORZENIE WILEKIEJ LITERY NA POCZĄTKU STRINGA */}
          {`${text.slice(0, 1).toUpperCase() + text.slice(1)}`}
>>>>>>> a76fd781fba75fddce9c75255a500d5452f153a5
        </label>
        <div className="input-group mb-3">
          <input
            id={fieldName.toLowerCase()}
            type="text"
            className="form-control"
<<<<<<< HEAD
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="999999999"
            aria-label="Phone Number"
            aria-describedby="basic-addon1"
          ></input>
        </div>

        <button className="btn btn-primary text-center">Click to edit</button>

        {patchProfilesErrors}
=======
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
>>>>>>> a76fd781fba75fddce9c75255a500d5452f153a5
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
