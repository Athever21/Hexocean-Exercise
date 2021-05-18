import React, { useState } from "react";
import axios from "axios";
import useField from "../useField";
import {
  Label,
  Field,
  Input,
  Time,
  Select,
  Button,
  Error,
  Success,
} from "./styled";

const Form = () => {
  const name = useField("text");
  const hours = useField("number");
  const minutes = useField("number");
  const seconds = useField("number");
  const type = useField("text");

  const noSlices = useField("number");
  const diameter = useField("number");
  const spiciness = useField("number");
  const slicesBread = useField("text");

  const [errors, setErrors] = useState({} as Errors);
  const [success, setSuccess] = useState(false);

  const emptyError = (fieldName: string) =>
    `${fieldName} field cannot be empty.`;

  const send = async () => {
    setErrors({});

    if (name.value === "")
      setErrors((e) => ({ ...e, nameError: emptyError("Name") }));
    if (hours.value === "" && minutes.value === "" && seconds.value === "")
      setErrors((e) => ({ ...e, timeError: emptyError("Duration") }));
    if (type.value === "")
      setErrors((e) => ({ ...e, typeError: emptyError("Type") }));
    else {
      switch (type.value) {
        case "pizza":
          if (noSlices.value === "")
            setErrors((e) => ({ ...e, slicesError: emptyError("Name") }));
          if (diameter.value === "")
            setErrors((e) => ({ ...e, diameterError: emptyError("Name") }));
          break;
        case "soup":
          if (spiciness.value === "")
            setErrors((e) => ({ ...e, spiceError: emptyError("Name") }));
          break;
        default:
          if (slicesBread.value === "")
            setErrors((e) => ({ ...e, breadError: emptyError("Name") }));
      }
    }

    if (Object.keys(errors).length === 0) {
      const duration = [hours, minutes, seconds]
        .reduce((a: string, b: { value: string }) => {
          if (b.value == "") return `${a}00:`;
          return `${a}${b.value.length === 1 ? "0" + b.value : b.value}:`;
        }, "")
        .replace(/:$/, "");

      let rest = {};

      switch (type.value) {
        case "pizza": {
          rest = {
            no_of_slices: parseInt(noSlices.value),
            diameter: parseFloat(diameter.value),
          };
          break;
        }
        case "soup": {
          rest = { spiciness_scale: parseInt(spiciness.value) };
          break;
        }
        default: {
          rest = { slices_of_bread: parseInt(slicesBread.value) };
        }
      }

      try {
        await axios.post("https://frosty-wood-6558.getsandbox.com:443/dishes", {
          name: name.value,
          preparation_time: duration,
          type: type.value,
          ...rest,
        });

        setSuccess(true);
        setTimeout(() => setSuccess(false), 5000);
      } catch (err) {
        const errs = err.response.data;
        if(errs.name) setErrors((e) => ({ ...e, nameError: errs.name}));
        if(errs.preparation_time) setErrors((e) => ({ ...e, timeError: errs.preparation_time}));
        if(errs.no_of_slices) setErrors((e) => ({ ...e, slicesError: errs.no_of_slices }));
        if(errs.diameter) setErrors((e) => ({ ...e, diameterError: errs.diameter }));
        if(errs.spiciness_scale) setErrors((e) => ({ ...e, spiceError: errs.spiciness_scale }));
        if(errs.slices_of_bread) setErrors((e) => ({ ...e, breadError: errs.slices_of_bread }));
      }
    }
  };

  return (
    <div>
      {success && <Success>Success</Success>}
      <Field>
        <Label>Name: </Label>
        <Input {...name} />
        {errors.nameError ? <Error>{errors.nameError}</Error> : ""}
      </Field>
      <Field>
        <Label>Duration time: </Label>
        <Time>
          <Input {...hours} placeholder="Hours" />
          <Input {...minutes} placeholder="Minutes" />
          <Input {...seconds} placeholder="Seconds" />
        </Time>
        {errors.timeError ? <Error>{errors.timeError}</Error> : ""}
      </Field>
      <Field>
        <Label>Type: </Label>
        <Select {...type}>
          <option value="default" hidden>
            Select dish type
          </option>
          <option value="pizza">Pizza</option>
          <option value="soup">Soup</option>
          <option value="sandwich">Sandwich</option>
        </Select>
        {errors.typeError ? <Error>{errors.typeError}</Error> : ""}
      </Field>
      {type.value === "pizza" ? (
        <div>
          <Field>
            <Label>Number of Slices: </Label>
            <Input {...noSlices} />
          </Field>
          {errors.slicesError ? <Error>{errors.slicesError}</Error> : ""}
          <Field>
            <Label>Diameter: </Label>
            <Input {...diameter} step="0.01" />
          </Field>
          {errors.diameterError ? <Error>{errors.diameterError}</Error> : ""}
        </div>
      ) : (
        ""
      )}
      {type.value === "soup" ? (
        <>
          <Field>
            <Label>Spiciness Scale (1-10): </Label>
            <Input {...spiciness} />
          </Field>
          {errors.spiceError ? <Error>{errors.spiceError}</Error> : ""}
        </>
      ) : (
        ""
      )}
      {type.value === "sandwich" ? (
        <>
          <Field>
            <Label>Number of bread slices: </Label>
            <Input {...slicesBread} />
          </Field>
          {errors.breadError ? <Error>{errors.breadError}</Error> : ""}
        </>
      ) : (
        ""
      )}
      <Button onClick={send}>Submit</Button>
    </div>
  );
};

export default Form;
