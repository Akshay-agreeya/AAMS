import React, { useEffect, useState } from "react";
import { Select } from "../input/Select";
import { getData } from "../../utils/CommonApi";

const Framework = ({ name = "framework", platformId, appTypeId, ...rest }) => {
  const [allLanguages, setAllLanguages] = useState([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const resp = await getData("/lookup/languages");
        if (resp.status === 200 && resp.success && Array.isArray(resp.contents)) {
          setAllLanguages(resp.contents);
        } else {
          setAllLanguages([]);
        }
      } catch (error) {
        console.error("Error fetching languages:", error);
        setAllLanguages([]);
      }
    };
    fetchLanguages();
  }, []);

  const showOptions = platformId && appTypeId;
const options = showOptions
  ? [
      { value: "", label: "Select Framework", props: { defaultValue: '', disabled: true } },
      ...allLanguages
        .filter(item =>
          item.platform_id === Number(platformId) &&
          item.app_type_id === Number(appTypeId)
        )
        .map(item => ({
          value: item.language_id,
          label: item.language
        }))
    ]
  : [];


  return (
    <Select options={options} name={name} {...rest} />
  );
};

export default Framework;