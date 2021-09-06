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
      if (err instanceof Error) {
        // DO ZROBIENIA CASE W PRZYPADKU GDY ZWRACA BadRequest Z SIGN IN
      }

      console.log('Error message z useRequesta');
      const fields = err.response.data.errors.map((err) => err.param);
      const errorMessage = err.response.data.errors.map((err) => err.msg);
      const objectFields = [];
      const objectMessage = [];

      for (let i = 0; i < errorMessage.length; i++) {
        objectMessage[fields[i]] = errorMessage[i];
      }

      fields.forEach((element) => {
        objectFields[element] = element;
      });
      setErrors({
        error: (
          <div className="box-errors-credentials">
            <p>Something went wrong...</p>
            <ul className="list-errors">
              {err.response.data.errors.map((err) => (
                <li key={err.msg}>{err.msg}</li>
              ))}
            </ul>
          </div>
        ),
        fields: objectFields,
        message: objectMessage,
      });
    }
  };

  return [doRequest, errors];
};

export default UseRequest;
