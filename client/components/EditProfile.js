const EditProfile = () => {
  const onSubmit = () => {
    console.log('onSubmit');
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
            placeholder="999999999"
            aria-label="Phone Number"
            aria-describedby="basic-addon1"
          ></input>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
