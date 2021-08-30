import { useState } from 'react';

import EditProfile from '../../components/EditProfile';

const Profile = ({ profile }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const fieldNames = Object.keys(profile);

  const paragraphHiddenList = fieldNames.map((e) => {
    // split(/(?=[A-Z])/) - wrzuca do tablicy po napotkaniu dużej litery
    const text = e.split(/(?=[A-Z])/).join(' ');

    return e === 'user' || e === '_id' || e === 'version' ? null : (
      <p key={profile._id++} className="lead text-start fw-bold px-5">{`${
        text.slice(0, 1).toUpperCase() + text.slice(1)
      }: ${profile[`${e}`]}`}</p>
    );
  });
  return (
    <div className="container text-muted px-5">
      <h1 className="display-2 text-center fst-italic mt-3">Profil</h1>
      <div className="my-3 border-bottom border-dark"></div>
      <div className="row gx-5">
        {/* <div className="container"> */}
        <div className="col  mb-5">
          <div className="border pb-3">
            <p className="lead text-start fw-bold px-5 pt-5">
              Firstname: {profile.user.firstname}
            </p>
            <p className="lead text-start fw-bold px-5">
              Lastname: {profile.user.lastname}
            </p>
            <p className="lead text-start fw-bold px-5">
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
        {/* </div> */}
        <div className="col  mb-5">
          <div className="border pb-3">
            <p className="lead text-center pt-3">Edit profile</p>
            <EditProfile />
            <div className="text-center">
              <button
                className="btn btn-primary text-center"
                type="button"
                onClick={() => setEditMode(!editMode)}
              >
                Click to edit
              </button>
            </div>
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
  };
};

export default Profile;
