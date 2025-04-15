import Layout from '../../component/Layout';
import Form from '../../component/form/Form';
import { FormItem } from '../../component/form/FormItem';
import { Input } from '../../component/input/Input';
import { OrganizationTypeSelect } from "../../component/select/OrganizationTypeSelect";
import { StateSelect } from "../../component/select/StateSelect";
import { IndustryTypeSelect } from "../../component/select/IndustryTypeSelect";
import { CountrySelect } from "../../component/select/CountrySelect";
import { patchData, postData } from '../../utils/CommonApi';
import notification from '../../component/notification/Notification';
import DatePicker, { formattedDate } from '../../component/input/DatePicker';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { convertUtcToLocal, handleApiError, handleApiSuccess } from '../../utils/Helper';
import { OPERATION_FAILED_MSG, ORG_SAVE_SUCCESS_MSG } from "../../constants/MessageConstants";
import { CitySelect } from '../../component/select/CitySelect';

const AddOrganization = () => {

  const [initialValues, setInitialValues] = useState({});
  const [selectedCountry, setSelectedCountry] = useState({});
  const [selectedState, setSelectedState] = useState({});

  const navigate = useNavigate();

  const { org_id } = useParams();
  const formRef = useRef();
  const countryRef = useRef();
  const stateRef = useRef();

  useEffect(() => {
    if (org_id)
      getOrganizationInfo();
  }, []);

  useEffect(() => {
    if (initialValues) {
      setSelectedCountry(initialValues.country);
      setTimeout(() => {
        setSelectedState(initialValues.state);

      }, 400);
    }
  }, [initialValues]);


  const getOrganizationInfo = async () => {

    try {
      const resp = await postData(`/org/get`, { org_id });
      setInitialValues(resp.contents?.[0]);
      formRef.current.setFieldsValue(resp.contents?.[0]);
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value || '');
    formRef.current?.setFieldValue("state", '');
  }
  const handleStateChange = (e) => {
    setSelectedState(e.target.value || '');
    formRef.current?.setFieldValue("city", '');
  }

  const handleSubmit = async (formData) => {

    try {
      const tempData = {
        ...formData,
        contract_expiry_date: formattedDate(new Date(formData.contract_expiry_date), "MM/dd/yyyy")
      }
      console.log(formData)
      org_id ? await patchData(`/org/edit/${org_id}`, tempData) : await postData("/org/add", tempData);
      handleApiSuccess(`${org_id ? "Edit" : "Add"} Organization`, ORG_SAVE_SUCCESS_MSG);
      navigate("/user-management");
    }
    catch (error) {
      console.log(error);
      handleApiError(`${org_id ? "Edit" : "Add"} Organization`, (error?.data?.errors?.[0] || OPERATION_FAILED_MSG));
    }
  }

  return (
    <Layout >
      <div className="adaMainContainer">
        <section className="adminControlContainer">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="pageTitle">
                  <h1>{`${org_id ? "Edit" : "Add New"} Organization`}</h1>
                </div>
              </div>
              <div className="col-12">
                <div className="userManagmentContainer">
                  <h3>Organization Details</h3>
                  <Form onSubmit={handleSubmit} initialValues={initialValues} ref={formRef}>
                    <div className="formContainer">
                      <div className="row">
                        {/* Organization Name */}
                        <div className="col-12 col-lg-4">
                          <div className="mb-3">
                            <FormItem name="org_name" label="Organization Name"
                              rules={[{ required: true, message: "Name is required" }]}
                              requiredMark={true}>
                              <Input type="text" placeholder="Organization Name" />
                            </FormItem>
                          </div>
                        </div>

                        {/* Organization Type */}
                        <div className="col-12 col-lg-4">
                          <div className="mb-3">
                            <FormItem name="org_type_id" label="Organization Type"
                              rules={[{ required: true, message: "Organization type is required" }]}
                              requiredMark={true}>
                              <OrganizationTypeSelect />
                            </FormItem>
                          </div>
                        </div>
                        {/* Industry Type */}
                        <div className="col-12 col-lg-4">
                          <div className="mb-3">
                            <FormItem name="industry_id" label="Industry Type"
                              rules={[{ required: true, message: "Industry type is required" }]}
                              requiredMark={true}>
                              <IndustryTypeSelect />
                            </FormItem>
                          </div>
                        </div>
                        {/* Country */}
                        <div className="col-12 col-lg-4">
                          <div className="mb-3">
                            <FormItem name="country" label="Country"
                              rules={[{ required: true, message: "Country is required" }]}
                              requiredMark={true}>
                              <CountrySelect onChange={handleCountryChange} ref={countryRef} />
                            </FormItem>
                          </div>
                        </div>
                        {/* State */}
                        <div className="col-12 col-lg-4">
                          <div className="mb-3">
                            <FormItem name="state" label="State"
                              rules={[{ required: true, message: "State is required" }]}
                              requiredMark={true}>
                              <StateSelect countryId={countryRef.current?.getISOCode(selectedCountry)}
                                ref={stateRef}
                                onChange={handleStateChange} value={selectedState} />
                            </FormItem>
                          </div>
                        </div>
                        {/* City */}
                        <div className="col-12 col-lg-4">
                          <div className="mb-3">
                            <FormItem name="city" label="City"
                              rules={[{ required: true, message: "City is required" }]}
                              requiredMark={true}>
                              <CitySelect countryId={countryRef.current?.getISOCode(selectedCountry)}
                                stateId={stateRef.current?.getISOCode(selectedState)} value={initialValues.city} />
                            </FormItem>
                          </div>
                        </div>

                        {/* Organization Address */}
                        <div className="col-12 col-lg-4">
                          <div className="mb-3">
                            <FormItem name="address_line" label="Organization Address"
                              rules={[{ required: true, message: "Organization Address is required" }]}
                              requiredMark={true}>
                              <Input type="text" placeholder="Organization Address" />
                            </FormItem>
                          </div>
                        </div>

                        {/* Contract Expiry Date */}
                        <div className="col-12 col-lg-4">
                          <div className="mb-3">
                            <FormItem name="contract_expiry_date" label="Hub Contract Expiry Date"
                              rules={[{ required: true, message: "Hub Contract Expiry Date is required" }]}
                              requiredMark={true}>
                              <DatePicker minDate={initialValues?.contract_expiry_date ? new Date(initialValues.contract_expiry_date) : new Date()}
                                name="contract_expiry_date"
                                value={initialValues.contract_expiry_date ? convertUtcToLocal(initialValues.contract_expiry_date) : ''} />
                            </FormItem>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h3>Organization Contact Person Details</h3>
                    <div className="formContainer">
                      <div className="row">
                        {[
                          { label: "First Name", name: "first_name", type: "text", placeholder: "First Name", messagerequired: "First Name is required" },
                          { label: "Last Name", name: "last_name", type: "text", placeholder: "Last Name", messagerequired: "Last Name is required" },
                          { label: "Email Address", name: "email", type: "text", patternType: "email", placeholder: "name@example.com", messagerequired: "Email is required", patternMsg: "Enter valid email" },
                          { label: "Contact Number", name: "phone_number", type: "text", placeholder: "Contact Number", messagerequired: "Contact No is required" },
                        ].map((field, index) => (
                          <div className="col-12 col-lg-4" key={index}>
                            <div className="mb-3">
                              <FormItem name={field.name} label={field.label}
                                rules={[{ required: true, message: field.messagerequired },
                                  ...(field.patternType === "email"
                                  ? [
                                      {
                                        pattern:
                                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: field.patternMsg,
                                      },
                                    ]
                                  : []),
                  
                                ]} requiredMark={true}>
                                <Input type={field.type} placeholder={field.placeholder} />
                              </FormItem>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="buttonBox">
                        <a href="/user-management" className="btnCancel">Cancel</a>
                        <button type="submit" className="btnAddUser">
                            {org_id ? "Update" : "Submit"}
                          </button>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AddOrganization;
