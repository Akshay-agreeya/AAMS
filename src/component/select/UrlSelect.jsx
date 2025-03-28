import React, { useEffect, useState } from "react";
import { Select } from "../input/Select";
import { getData } from "../../utils/CommonApi";

export const UrlSelect = ({ org_id, product_id, onChange, ...rest }) => {

  const [selectedProduct, setSelectedProduct] = useState({});
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (org_id)
      loadUrls(org_id);
  }, [org_id]);

  useEffect(() => {
    if (product_id && options?.length > 0)
      handleUrlChange({ target: { value: product_id } });
  }, [options, product_id]);

  const handleUrlChange = (e) => {

    const prod = options.find(item => item.value === Number(e.target.value)) || {};
    setSelectedProduct(prod);

    if (onChange)
      onChange(prod);
  }

  const loadUrls = async (org_id) => {
    try {
      const resp = await getData(`report/get/urls/${org_id}`);
      if (resp.contents && resp.contents.length > 0) {
        const urlOptions = resp.contents.map((item) => ({
          value: item.service_id,
          label: item.web_url,
          product: item
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

  return <Select value={selectedProduct?.value} options={options} onChange={handleUrlChange} {...rest} />;
};
