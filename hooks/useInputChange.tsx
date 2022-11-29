import { ChangeEvent, Dispatch, SetStateAction } from "react";

function useInputChange(values: any, setValues: Dispatch<SetStateAction<any>>) {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value.replace(/  +/g, "") });
  };
  return {
    onChange
  };
}

export default useInputChange;
