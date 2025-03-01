import Layout from '../../component/Layout';
import Form from '../../component/form/Form';
import { FormItem } from '../../component/form/FormItem';
import { Input } from '../../component/input/Input';
import { OrganizationTypeSelect } from "../../component/select/OrganizationTypeSelect";
import { StateSelect } from "../../component/select/StateSelect";
import { IndustryTypeSelect } from "../../component/select/IndustryTypeSelect";
import { CountrySelect } from "../../component/select/CountrySelect";
import { getData, patchData, postData } from '../../utils/CommonApi';
import notification from '../../component/notification/Notification';
import DatePicker, { formattedDate } from '../../component/input/DatePicker';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { convertUtcToLocal } from '../../utils/Helper';

const AddOrganization = () => {

  const [initialValues, setInitialValues] = useState({});

  const navigate = useNavigate();

  const { org_id } = useParams();
  const formRef = useRef();

  useEffect(() => {
    if (org_id)
      getOrganizationInfo();
  }, []);

  const getOrganizationInfo = async () => {

    try {
      const resp = await getData(`/org/get/${org_id}`);
      setInitialValues(resp.data);
      formRef.current.setFieldsValue(resp.data);
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (formData) => {

    try {
      const tempData = {
        ...formData,
        contract_expiry_date: formattedDate(new Date(formData.contract_expiry_date), "MM/dd/yyyy")
      }
      const resp = org_id ? await patchData(`/org/edit/${org_id}`, tempData): await postData("/org/add", tempData);
      notification.success({
        title: `${org_id?"Edit":"Add"} Organization`,
        message: resp.message
      });
      navigate("/admin/user-management");
    }
    catch (error) {
      console.log(error);
      notification.error({
        title: 'Add Organization',
        message: error.data?.error
      })
    }
  };

  return (
    <Layout >
      <div className="adaMainContainer">
        <section className="adminControlContainer">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="pageTitle">
                  <h1>Add New Organization</h1>
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
                              <CountrySelect />
                            </FormItem>
                          </div>
                        </div>
                        {/* State */}
                        <div className="col-12 col-lg-4">
                          <div className="mb-3">
                            <FormItem name="state" label="State"
                              rules={[{ required: true, message: "State is required" }]}
                              requiredMark={true}>
                              <StateSelect />
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
                                value={initialValues.contract_expiry_date?convertUtcToLocal(initialValues.contract_expiry_date):''} />
                            </FormItem>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h3>Organization Contact Person Details</h3>
                    <div className="formContainer">
                      <div className="row">
                        {[
                          { label: "First Name", name: "first_name", type: "text", placeholder: "First Name",messagerequired:"First Name is required" },
                          { label: "Last Name", name: "last_name", type: "text", placeholder: "Last Name",messagerequired:"Last Name is required" },
                          { label: "Email Address", name: "email", type: "text", patternType:"email", placeholder: "name@example.com",messagerequired:"Email is required", patternMsg:"Enter valid email" },
                          { label: "Contact Number", name: "phone_number", type: "text", placeholder: "Contact Number",messagerequired:"Contact No is required" },
                        ].map((field, index) => (
                          <div className="col-12 col-lg-4" key={index}>
                            <div className="mb-3">
                              <FormItem name={field.name} label={field.label}
                                rules={[{ required: true, message: field.messagerequired },
                                  { type: field.patternType, message: field.patternMsg }
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
                        <a href="/admin/user-management" className="btnCancel">Cancel</a>
                        <button type="submit" className="btnAddUser">Submit</button>
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
