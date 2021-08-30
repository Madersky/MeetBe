const EditProfile = ({ profile }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log('onSubmit');
  };
  const fieldNames = Object.keys(profile);

  const formList = fieldNames.map((fieldName) => {
    // STRING W PRZYPADKU GDY W ŚRODKU BYŁA WIELKA LITERA
    // CO ŚWIADCZY O PODZIELENIU STRINGA SPACJĄ
    const text = fieldName.split(/(?=[A-Z])/).join(' ');

    return fieldName === 'user' ||
      fieldName === '_id' ||
      fieldName === 'version' ? null : (
      <div key={profile._id++}>
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
