import React, { useEffect, useState } from "react";
import { Select } from "../input/Select";
import { getData } from "../../utils/CommonApi";

export const UrlSelect = ({ org_id,web_url, onChange, ...rest }) => {
  const [selectedUrl, setSelectedurl]  = useState(web_url);
  const [options, setOptions] = useState([]);
  useEffect(() => {
    console.log(org_id)
    if (org_id) {
      loadUrls(org_id);
    }
  }, [org_id]);

const handleUrlChange = (e)=>{
  
  setSelectedurl (e.target.value)
  if (onChange)
  onChange (e)
}
  const loadUrls = async (org_id) => {
    try {
      const resp = await getData(`report/get/urls/${org_id}`);
      if (resp.contents && resp.contents.length > 0) {
        const urlOptions = resp.contents.map((item) => ({
          value: item.web_url,
          label: item.web_url,
        }));
        
        setOptions(urlOptions);
      } else {
        setOptions([{ value: "", label: "No URLs Available", disabled: true }]);
      }
    } catch (error) {
      console.error("Error fetching URLs:", error);
      setOptions([{ value: "", label: "Error Loading URLs", disabled: true }]);
    }
  };

  return <Select  value = {selectedUrl} options={options} onChange={handleUrlChange} {...rest} />;
};
