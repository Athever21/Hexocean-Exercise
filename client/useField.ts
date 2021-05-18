import { useState } from "react";

export default (type: string) => {
  const [value, setValue] = useState("");

  const onChange = ({
    target,
  }: {
    target: HTMLInputElement | HTMLSelectElement;
  }) => setValue(target.value);

  return {
    type,
    value,
    onChange,
  };
};
