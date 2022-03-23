import React, { useEffect } from 'react';

const Alert = ({ type, msg, removeAlert, list }) => {
  const timeout = setTimeout(() => {
    removeAlert();
  }, 3000);

  useEffect(() => {
    return () => clearTimeout(timeout);
  }, [list]);
  return <p>{msg}</p>;
};

export default Alert;
