import { useState } from 'react';

const useLogin = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => setValue(event.target.value);

  return {
    type,
    value,
    onChange,
  };
};

export default useLogin;
