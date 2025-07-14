import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getData } from "../../utils/CommonApi";
import { Select } from "../input/Select";

const AppType = ({ value = "", onChange, name = "appType", disabled = false, platform, ...rest }) => {
  const [options, setOptions] = useState([
    { value: "", label: "Select App Type", props: { defaultValue: '', disabled: true } }
  ]);

  useEffect(() => {
    getData("/lookup/app-type")
      .then(resp => {
        if (Array.isArray(resp.contents)) {
          const opts = resp.contents.map(item => ({
            value: item.app_type_id, // Use numeric ID for value
            label: item.app_type
          }));
          opts.unshift({ value: "", label: "Select App Type", props: { defaultValue: '', disabled: true } });
          setOptions(opts);
        }
      })
      .catch(() => {
        setOptions([{ value: "", label: "Select App Type", props: { defaultValue: '', disabled: true } }]);
      });
  }, []);

  return (
    <Select
      options={options}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      {...rest}
    />
  );
};

AppType.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  disabled: PropTypes.bool,
};

export default AppType;