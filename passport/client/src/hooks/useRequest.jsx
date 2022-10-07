import { useState } from "react";
import axios from "axios";

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doSend = async (props = {}) => {
    try {
      setErrors(null);
      const formatUrl = `http://localhost:4000${url}`;
      const response = await axios[method](formatUrl, {...props, ...body});
      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err) {
      <h1>{err}</h1>;
      setErrors(
        <div className="alert alert-danger">
          <h4>Ooops....</h4>
          <ul className="my-0">
            {err.response?.data.errors.map((err) => (
              <li key={err.field}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };
  return { doSend, errors };
};
export default useRequest;
