import React, { useEffect, useState } from 'react';
import Layout from '../../component/Layout';
import { OrganizationSelect } from '../../component/select/OrganizationSelect';
import { postData } from '../../utils/CommonApi';
import { getFormattedAddress, getFullName } from '../../utils/Helper';
import ProductionPermissionTable from './ProductionPermissionTable';
import notification from '../../component/notification/Notification';
import { ORG_ID } from '../../utils/Constants';


const ProductPermission = () => {

    const [selectedOrganizationId, setSelectedOrganizationId] = useState();
    const [selectedOrganization, setSelectedOrganization] = useState({});
    const [formData, setFormData] = useState({});

    useEffect(() => {
        getOrganizationDetails();
    }, [selectedOrganizationId]);


    const getOrganizationDetails = async () => {
        try {
            const resp = await postData(`/org/get`, { org_id: selectedOrganizationId });
            setSelectedOrganization(resp.contents?.[0]);
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleChange = (data) => {
        setFormData(data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData?.length === 0) {
            notification.error({
                title: "Product Permission",
                message: "Please select atleast one product",
            });
            return;
        }
        try {
            await postData(`/permission/update`, { usersWithServices: formData });
            notification.success({
                title: `Product Permission`,
                message: "Permission saved successfully!",
            });
        }
        catch (error) {
            console.log(error);
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
                                    <h1>Product Permission</h1>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="roleManagmentContainer">
                                    <form>
                                        <div className="d-flex mb-4 align-items-center">
                                            <h3 className="mb-0 me-3">Selected Organization</h3>
                                            <div>
                                                <OrganizationSelect id="selUser" name="role" type="object"
                                                    defaultValue={sessionStorage.getItem(ORG_ID)}
                                                    selectFirst={true}
                                                    onChange={(e) => { setSelectedOrganizationId(e.target.value) }} />
                                            </div>
                                        </div>

                                        <div className="formContainer">
                                            <div className="row">
                                                <div className="col-12 col-lg-3">
                                                    <div className="userStaticInfo">
                                                        <div className="title">Organization Name</div>
                                                        <div className="value">{selectedOrganization.org_name}</div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-lg-3">
                                                    <div className="userStaticInfo">
                                                        <div className="title">Organization Address</div>
                                                        <div className="value">{getFormattedAddress(selectedOrganization)}</div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-lg-3">
                                                    <div className="userStaticInfo">
                                                        <div className="title">Contact Person</div>
                                                        <div className="value">{`${getFullName(selectedOrganization.first_name, selectedOrganization.last_name)} ${selectedOrganization.phone_number ? ('- ' + selectedOrganization.phone_number) : ''}`} </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-lg-3">
                                                    <div className="userStaticInfo">
                                                        <div className="title">Email</div>
                                                        <div className="value">{selectedOrganization.email || ''}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="gridContainer">
                                                <ProductionPermissionTable org_id={selectedOrganizationId} onChange={handleChange} />
                                            </div>
                                        </div>

                                        <div className="buttonBox mt-4">
                                            <a href="/product-permission" className="btnCancel">Cancel</a>
                                            <button type="submit" className="btnAddUser" onClick={handleSubmit}>Save</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default ProductPermission;