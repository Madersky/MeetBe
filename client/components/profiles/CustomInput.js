const CustomInput = ({
  name,
  id,
  type,
  className,
  value,
  setter,
  placeholder,
  error,
}) => {
  return (
    <div>
      <label className="form-label" htmlFor={id}>
        {name}
      </label>
      <div className={className}>
        <input
          id={id}
          type={type}
          className="form-control"
          value={value}
          onChange={(e) => setter(e.target.value)}
          placeholder={placeholder}
          aria-label={id}
          aria-describedby="basic-addon1"
        ></input>
      </div>
      <p className="bg-danger text-white">{error}</p>
    </div>
  );
};
export default CustomInput;
