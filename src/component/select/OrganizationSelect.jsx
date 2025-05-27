// import React, { useEffect, useState } from "react";
// import { Select } from "../input/Select";
// import { getData } from "../../utils/CommonApi";
// import { ORG_ID } from "../../utils/Constants";


// export const OrganizationSelect = ({ name = "organization", defaultValue, selectFirst = false,
//   onChange = () => { }, ...rest }) => {

//   const [organizations, setOrganizations] = useState([]);
//   const [options, setOptions] = useState([]);
//   const [selectedValue, setSelectedvalue] = useState(defaultValue);

//   useEffect(() => {
//     loadOrganizations();
//   }, []);

//   const loadOrganizations = async () => {
//     try {
//       const resp = await getData("/org/list");
//       setOrganizations(resp.contents);
//     }
//     catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {

//     const options = organizations.map(item => ({ value: item.org_id, label: item.org_name }));
//     options.splice(0, 0, { value: "", label: "Select Organization", props: { defaultValue, disabled: true } });
//     setOptions(options);

//   }, [organizations]);

//   useEffect(() => {

//     if (sessionStorage.getItem(ORG_ID)) {
//       onChange({
//         target: {
//           value: sessionStorage.getItem(ORG_ID)
//         }
//       })
//     }
//     else if (selectFirst) {
//       setSelectedvalue(options?.[1]?.value);
//       onChange({
//         target: {
//           value: options?.[1]?.value
//         }
//       })
//     }

//   }, [options]);

//   const handleChange = (e) => {
//     sessionStorage.setItem(ORG_ID, e.target.value);
//     setSelectedvalue(e.target.value);
//     onChange(e);
//   }

//   return <Select options={options} name={name} defaultValue={defaultValue} {...rest}
//     onChange={handleChange} value={selectedValue}/>;
// };


import React, { useEffect, useState } from "react";
import { Select } from "../input/Select";
import { getData } from "../../utils/CommonApi";
import { ORG_ID } from "../../utils/Constants";

export const OrganizationSelect = ({
  name = "organization",
  defaultValue,
  selectFirst = false,
  onChange = () => {},
  disabled = false,
  ...rest
}) => {
  const [organizations, setOrganizations] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    loadOrganizations();
  }, []);

  const loadOrganizations = async () => {
    try {
      const resp = await getData("/org/list");
      setOrganizations(resp.contents);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const opts = organizations.map(item => ({
      value: item.org_id,
      label: item.org_name,
    }));
    opts.unshift({ value: "", label: "Select Organization" });
    setOptions(opts);
  }, [organizations]);

  useEffect(() => {
    // Only apply default value once when adding new record (i.e., when no value selected yet)
    if (defaultValue && !selectedValue) {
      setSelectedValue(defaultValue);
      onChange({ target: { value: defaultValue } });
    } else if (!defaultValue && selectFirst && options.length > 1 && !selectedValue) {
      const firstValue = options[1].value;
      setSelectedValue(firstValue);
      onChange({ target: { value: firstValue } });
    }
  }, [options, defaultValue, selectFirst, onChange, selectedValue]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
    sessionStorage.setItem(ORG_ID, value);
    onChange(e);
  };

  return (
    <Select
      options={options}
      name={name}
      value={selectedValue}
      onChange={handleChange}
      disabled={disabled}
      {...rest}
    />
  );
};
