import React, { useEffect, useState } from "react";
import { Select } from "../input/Select";
import { getData } from "../../utils/CommonApi";

export const UrlSelect = ({ org_id, onChange, ...rest }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (org_id) {
      loadUrls(org_id);
    }
  }, [org_id]);

  const loadUrls = async (org_id) => {
    try {
      const resp = await getData(`/get/urls/${org_id}`);
      if (resp.contents && resp.contents.length > 0) {
        const urlOptions = resp.contents.map((item) => ({
          value: item.web_url,
          label: item.web_url,
        }));
        urlOptions.unshift({ value: "", label: "Select URL", disabled: true });
        setOptions(urlOptions);
      } else {
        setOptions([{ value: "", label: "No URLs Available", disabled: true }]);
      }
    } catch (error) {
      console.error("Error fetching URLs:", error);
      setOptions([{ value: "", label: "Error Loading URLs", disabled: true }]);
    }
  };

  return <Select options={options} onChange={onChange} {...rest} />;
};
