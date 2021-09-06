import { useState, useEffect, useRef } from 'react';
import Router from 'next/router';

import useRequest from '../../hooks/use-request';
import EditProfile from '../../components/profiles/EditProfile';
import Hobbys from '../../components/profiles/Hobbys';
import ImagePanel from '../../components/profiles/ImagePanel';
import UploadImage from '../../components/profiles/UploadImage';

const Profile = ({ profile, currentUser }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [editMode, setEditMode] = useState(false);

  // const isInitialMount = useRef(true);

  const hobbys = Array.from(profile.hobbys);

  let fieldNames = Object.keys(profile);

  const paragraphHiddenList = fieldNames.map((fieldName) => {
    // split(/(?=[A-Z])/) - wrzuca do tablicy po napotkaniu dużej litery
    const text = fieldName.split(/(?=[A-Z])/).join(' ');

    return fieldName === 'user' ||
      fieldName === '_id' ||
      fieldName === 'version' ||
      fieldName === 'hobbys' ? null : (
      <p
        key={Math.random(profile._id)}
        className="lead text-start fw-bold px-5"
      >
        {`${text.slice(0, 1).toUpperCase() + text.slice(1)}
        : 
        ${profile[`${fieldName}`]}`}
      </p>
    );
  });
  return (
    <div className="container text-muted px-5">
      <h1 className="display-2 text-center fst-italic mt-3">Profil</h1>
      <div className="my-3 border-bottom border-dark"></div>
      <div className="row gx-5">
        {/* <div className="container"> */}
        <div className="col-lg-6 mb-5">
          <div className="border">
            <div className="row gx-1">
              <div className="col-xl-5 d-flex justify-content-center align-items-center">
                <ImagePanel
                  profileImage={profile.profilePhoto || 'profile.jpg'}
                />
              </div>
              <div className="col-lg-7 ">
                <UploadImage />
                <p className="lead text-start fw-bold px-2 pt-5">
                  Firstname: {profile.user.firstname}
                </p>
                <p className="lead text-start fw-bold px-2">
                  Lastname: {profile.user.lastname}
                </p>
                <p className="lead text-start fw-bold px-2">
                  Email: {profile.user.email}{' '}
                </p>
                <div className={`${isOpen ? 'collapse' : ''}`} id="viewMore">
                  {paragraphHiddenList}
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-outline-muted border-0 text-decoration-underline"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#viewMore"
                    aria-expanded="true"
                    aria-controls="viewMore"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    {`${isOpen ? 'View more info' : 'close'}`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="col-lg-6 mb-5">
          <div className="border pb-3">{paragraphHiddenList}</div>
        </div> */}
        {/* </div> */}
      </div>
      <div className="row gx-5">
        <div className="col-lg mb-5">
          <div className="border pb-3">
            <Hobbys hobbys={hobbys} currentUser={currentUser} />
          </div>
        </div>
      </div>
      <div className="row gx-5">
        <div className="col-md mb-5">
          <div className="border pb-3">
            <p className="lead text-center pt-3">Edit profile</p>
            <EditProfile profile={profile} currentUser={currentUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

Profile.getInitialProps = async (context, client, currentUser) => {
  const profileRes = await client.get(
    `api/profiles/id/${context.query.userId}`
  );
  // console.log(context.query.userId);
  // console.log('PROFILE RES CONSOLE LOG GET INITIAL PROPS', profileRes.data);

  return {
    ...profileRes.data,
    currentUser,
  };
};

export default Profile;
