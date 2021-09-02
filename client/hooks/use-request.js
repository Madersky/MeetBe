import axios from 'axios';
import { useState } from 'react';

const UseRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);
  // console.log(errors);
  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      console.log('Error message z useRequesta');
      // console.log(err.response.data.errors.map((err) => err.param));
      const fields = err.response.data.errors.map((err) => err.param);
      setErrors({
        error: (
          <div className="box-errors-credentials">
            <h4>Something went wrong...</h4>
            <ul className="list-errors">
              {err.response.data.errors.map((err) => (
                <li key={err.msg}>{err.msg}</li>
              ))}
            </ul>
          </div>
        ),
        fields: fields,
      });
    }
  };

  return [doRequest, errors];
};

export default UseRequest;
