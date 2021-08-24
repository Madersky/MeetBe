const Profile = () => {
  return (
    <div className="container-lg text-muted">
      <h1 className="display-2">Profil</h1>
      <div className="my-5 border-bottom border-dark"></div>
      <div className="row justify-content-center mt-5">
        <div className="col-lg-6">
          <p className="lead text-center border p-5">KOLUMNA 1</p>
        </div>
        <div className="col-lg-6 text-center">
          <p className="lead text-center border p-5">KOLUMNA 2</p>
        </div>
      </div>
    </div>
  );
};

Profile.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get(`./api/profiles/id/${currentUser.id}`);
};

export default Profile;
