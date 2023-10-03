import React from "react";
import { Controller } from "react-hook-form";
import Label from "./Label";
import Select from "./Select";
import Wrapper from "./Wrapper";

const Factorial = ({ factorial = [], title = "", control }) => {
  return (
    <Wrapper>
      <Label label={title} isTitle />
      <div className="flex flex-col gap-1">
        {factorial.map((item, index) => (
          <div className="flex items-center justify-between" key={index}>
            <Label label={item.title} />
            <Controller
              name={item.name}
              control={control}
              defaultValue={item.value.find((value) => value.isDefault).value}
              render={({ field }) => (
                <Select field={field} options={item.value}>
                  {item.value.map((itemValue, index) => (
                    <option
                      value={itemValue.value}
                      key={index}
                      className="text-sm"
                    >
                      {itemValue.key}
                    </option>
                  ))}
                </Select>
              )}
            />
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default Factorial;
