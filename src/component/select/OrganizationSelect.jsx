import React, { useEffect, useState } from "react";
import { Select } from "../input/Select";
import { getData } from "../../utils/CommonApi";


export const OrganizationSelect = ({ name = "organization", defaultValue, selectFirst = false,
  onChange = () => { }, ...rest }) => {

  const [organizations, setOrganizations] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    loadOrganizations();
  }, []);

  const loadOrganizations = async () => {
    try {
      const resp = await getData("/org/list");
      setOrganizations(resp.contents);
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

    const options = organizations.map(item => ({ value: item.org_id, label: item.org_name }));
    options.splice(0, 0, { value: "", label: "Select Organization", props: { defaultValue, disabled: true } });
    setOptions(options);

  }, [organizations]);

  useEffect(() => {

    if (selectFirst) {
      const selectedOption = {
        target: {
          value: options?.[1]?.value
        }
      };
      onChange(selectedOption);
    }
  }, [options]);


  return <Select options={options} name={name} defaultValue={defaultValue} {...rest}
    onChange={onChange} />;
};
