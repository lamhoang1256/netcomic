import { IOption } from "components/select/Select";
import { Dispatch, SetStateAction } from "react";

function useSelectChange(values: any, setValues: Dispatch<SetStateAction<any>>) {
  const onChangeSelect = (key: string, option: IOption) => {
    setValues({ ...values, [key]: option.value });
  };
  return {
    onChangeSelect
  };
}

export default useSelectChange;
