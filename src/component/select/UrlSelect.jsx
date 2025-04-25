import React, { useEffect, useState } from "react";
import { Select } from "../input/Select";
import { getData } from "../../utils/CommonApi";
import {ADMIN_ROLE_KEY, USER_REPORT_PERMISSION} from "../../utils/Constants"
import { getOrganizationIdFromSession, getUserRoleKey } from "../../utils/Helper";

export const UrlSelect = ({ org_id, product_id, onChange, ...rest }) => {
  const [selectedProduct, setSelectedProduct] = useState({});
  const [options, setOptions] = useState([]);
   const roleKey = getUserRoleKey();

  useEffect(() => {
    if (org_id) {
      loadUrls(org_id);
    } else {
      loadUserUrls();
    }
  }, [org_id]);

  useEffect(() => {
    if (product_id && options?.length > 0) {
      handleUrlChange({ target: { value: product_id } });
    }
  }, [options, product_id]);

  const handleUrlChange = (e) => {
    const prod = options.find((item) => item.value === Number(e.target.value)) || {};
    setSelectedProduct(prod);

    if (onChange) onChange(prod);
  };

  const loadUrls = async (org_id) => {
    try {
      const resp = await getData(`report/get/urls/${org_id}`);
      const urlOptions = resp.contents?.map((item) => ({
        value: item.service_id,
        label: item.web_url,
        product: item,
      })) || [];

      setOptions(urlOptions.length > 0 ? urlOptions : [{ value: "", label: "No URLs Available", disabled: true }]);
    } catch (error) {
      console.error("Error fetching organization URLs:", error);
      setOptions([{ value: "", label: "Error Loading URLs", disabled: true }]);
    }
  };

  const loadUserUrls = async () => {
    try {
      const userResp = roleKey === ADMIN_ROLE_KEY? await getData(`report/get/urls/${getOrganizationIdFromSession()}`):await getData(`/report/get/user-urls?permission_name=${USER_REPORT_PERMISSION}`);
      const userUrlOptions = userResp.contents?.map((item) => ({
        value: item.service_id,
        label: item.web_url,
        product: item,
      })) || [];

      setOptions(userUrlOptions.length > 0 ? userUrlOptions : [{ value: "", label: "No URLs Available", disabled: true }]);
    } catch (error) {
      console.error("Error fetching user URLs:", error);
      setOptions([{ value: "", label: "Error Loading URLs", disabled: true }]);
    }
  };

  return <Select value={selectedProduct?.value} options={options} onChange={handleUrlChange} {...rest} />;
};
