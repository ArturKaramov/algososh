import { useState } from "react";

export const useForm = <T>(inputValues: T) => {
  const [values, setValues] = useState(inputValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return { values, handleChange, setValues };
};
