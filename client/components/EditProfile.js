const EditProfile = () => {
  const onSubmit = () => {
    console.log('onSubmit');
  };
  return (
    <div className="container">
      <div className="section">
        <form onSubmit={onSubmit}>
          <label className="form-label" htmlFor="age">
            Age
          </label>
          <div class="input-group mb-3">
            <input
              id="age"
              type="text"
              className="form-control"
              placeholder="18"
              aria-label="age"
              aria-describedby="basic-addon1"
            ></input>
          </div>
          <label className="form-label" htmlFor="age">
            School
          </label>
          <div class="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="university"
              aria-label="School"
              aria-describedby="basic-addon1"
            ></input>
          </div>
          <label className="form-label" htmlFor="age">
            Birthdate
          </label>
          <div class="input-group mb-3">
            <input
              type="data"
              className="form-control"
              placeholder="19.04.19999"
              aria-label="Birthdate"
              aria-describedby="basic-addon1"
            ></input>
          </div>
          <label className="form-label" htmlFor="age">
            About me
          </label>
          <div class="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="siema jestem kozak"
              aria-label="About"
              aria-describedby="basic-addon1"
            ></input>
          </div>
          <label className="form-label" htmlFor="age">
            Hobbys
          </label>
          <div class="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="programowanie"
              aria-label="Hobbys"
              aria-describedby="basic-addon1"
            ></input>
          </div>
          <label className="form-label" htmlFor="age">
            Interests
          </label>
          <div class="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="programowanie"
              aria-label="Interests"
              aria-describedby="basic-addon1"
            ></input>
          </div>
          <label className="form-label" htmlFor="age">
            Hometown
          </label>
          <div class="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Brzeg"
              aria-label="Hometown"
              aria-describedby="basic-addon1"
            ></input>
          </div>
          <label className="form-label" htmlFor="age">
            Profession
          </label>
          <div class="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Programista"
              aria-label="Profession"
              aria-describedby="basic-addon1"
            ></input>
          </div>
          <label className="form-label" htmlFor="age">
            Current Job
          </label>
          <div class="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Programista fullstack"
              aria-label="Current Job"
              aria-describedby="basic-addon1"
            ></input>
          </div>
          <label className="form-label" htmlFor="age">
            Social status
          </label>
          <div class="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="engaged"
              aria-label="Social status"
              aria-describedby="basic-addon1"
            ></input>
          </div>
          <label className="form-label" htmlFor="age">
            Phone number
          </label>
          <div class="input-group mb-3">
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
    </div>
  );
};

export default EditProfile;
