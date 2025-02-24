import React from "react";
import { Select } from "../input/Select";

const organizations = [
  { value: "", label: "Select Organization", disabled: true },
  { value: "1", label: "Organization Enterprise -1" },
  { value: "2", label: "Organization Enterprise -2" },
];

export const OrganizationSelect = ({ name = "role", defaultValue = "1", ...rest }) => {
  return <Select options={organizations} name={name} value={defaultValue} {...rest} />;
};
