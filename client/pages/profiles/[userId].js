import { useState } from 'react';

const Profile = ({ profile }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const changeIsOpen = () => setIsOpen(!isOpen);
  const changeEditMode = () => setEditMode(!editMode);

  return (
    <div className="container-fluid text-muted">
      <h1 className="display-2 text-center fst-italic mt-3">Profil</h1>
      <div className="my-3 border-bottom border-dark"></div>
      <div className="row justify-content-between mt-5">
        <div className="col-lg-5 border ms-5">
          <p className="lead text-start fw-bold px-5 pt-5">
            Firstname: {profile.user.firstname}
          </p>
          <p className="lead text-start fw-bold px-5">
            Lastname: {profile.user.lastname}
          </p>
          <p className="lead text-start fw-bold px-5">
            Email: {profile.user.email}{' '}
          </p>
          <p className="lead text-start fw-bold px-5">Age: {profile.age}</p>
          <p className="lead text-start fw-bold px-5">
            School: {profile.school}
          </p>

          <div className={`${isOpen ? 'collapse' : ''}`} id="viewMore">
            <p className="lead text-start fw-bold px-5">
              Birthdate: {profile.birthDate}
            </p>
            <p className="lead text-start fw-bold px-5">
              Message: {profile.messa}
            </p>
            <p className="lead text-start fw-bold px-5">
              Profile Photo: {profile.profilePhoto}
            </p>
            <p className="lead text-start fw-bold px-5">
              Hobbys: {profile.hobbys}
            </p>
            <p className="lead text-start fw-bold px-5">
              Interests: {profile.interests}
            </p>
            <p className="lead text-start fw-bold px-5">
              Hometown: {profile.hometown}
            </p>
            <p className="lead text-start fw-bold px-5">
              Profession: {profile.profession}
            </p>
            <p className="lead text-start fw-bold px-5">
              Current Job: {profile.currentJob}{' '}
            </p>
            <p className="lead text-start fw-bold px-5">
              Social status: {profile.socialStatus}
            </p>
            <p className="lead text-start fw-bold px-5">
              Phone number: {profile.phoneNumber}{' '}
            </p>
          </div>
          <div className="text-center">
            <button
              className="btn btn-outline-muted border-0 text-decoration-underline"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#viewMore"
              aria-expanded="true"
              aria-controls="viewMore"
              onClick={changeIsOpen}
            >
              {`${isOpen ? 'View more info' : 'close'}`}
            </button>
          </div>
        </div>
        <div className="col-lg-5 border me-5">
          <button
            className="btn btn-primary"
            type="button"
            onClick={changeEditMode}
          >
            Click to edit
          </button>
          <p className="lead text-center p-5">KOLUMNA 2</p>
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
  };
};

export default Profile;
