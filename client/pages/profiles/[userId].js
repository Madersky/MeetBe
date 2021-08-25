import { useState } from 'react';
const Profile = () => {
  const [isOpen, setIsOpen] = useState(true);

  const changeIsOpen = () => setIsOpen(!isOpen);

  return (
    <div className="container-fluid text-muted">
      <h1 className="display-2 text-center fst-italic mt-3">Profil</h1>
      <div className="my-3 border-bottom border-dark"></div>
      <div className="row justify-content-between mt-5">
        <div className="col-lg-5 border ms-5">
          <p className="lead text-start fw-bold px-5 pt-5">Firstname: </p>
          <p className="lead text-start fw-bold px-5">Lastname: </p>
          <p className="lead text-start fw-bold px-5">Email: </p>
          <p className="lead text-start fw-bold px-5">Age: </p>
          <p className="lead text-start fw-bold px-5">School: </p>
          <div className="text-center">
            <button
              className="btn btn-outline-muted border-0 text-decoration-underline"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#viewMore"
              aria-expanded="false"
              aria-controls="viewMore"
              onClick={changeIsOpen}
            >
              View More Information
            </button>
          </div>
          <div className={`${isOpen ? 'collapse' : ''}`} id="viewMore">
            <p className="lead text-start fw-bold px-5">Birthdate: </p>
            <p className="lead text-start fw-bold px-5">Message: </p>
            <p className="lead text-start fw-bold px-5">Profile Photo: </p>
            <p className="lead text-start fw-bold px-5">Hobbys: </p>
            <p className="lead text-start fw-bold px-5">Interests: </p>
            <p className="lead text-start fw-bold px-5">Hometown: </p>
            <p className="lead text-start fw-bold px-5">Profession: </p>
            <p className="lead text-start fw-bold px-5">Current Job: </p>
            <p className="lead text-start fw-bold px-5">Social status: </p>
            <p className="lead text-start fw-bold px-5">Phone number: </p>
          </div>
        </div>
        <div className="col-lg-5 border me-5">
          <p className="lead text-center p-5">KOLUMNA 2</p>
        </div>
      </div>
    </div>
  );
};
//   user: UserDoc;
//   age: string;
//   birthDate: string;
//   message: string;
//   profilePhoto?: any;
//   createdAt: string;
//   hobbys: [string];
//   interests: [string];
//   hometown: string;
//   school: string;
//   profession: string;
//   currentJob: string;
//   socialStatus: string;
//   phoneNumber: string;

// Profile.getInitialProps = async (context, client, currentUser) => {
//   const { data } = await client.get(`./api/profiles/id/${currentUser.id}`);
// };

export default Profile;
