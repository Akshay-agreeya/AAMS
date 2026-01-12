import React, { useEffect, useState } from 'react';
import Layout from '../../component/Layout';
import { getData } from '../../utils/CommonApi';
import Loading from '../../component/Loading';
import { OrganizationDetails } from './OrganizationDetails';
import ProductTable from './ProductTable';
import { getAllowedOperations, operationExist } from '../../utils/Helper';
import { PRODUCT_MGMT } from '../../utils/Constants';
import ThirdPartyReportTable from './ThirdPartyReportTable';


const ProductManagement = () => {

  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(false);

  const operations = getAllowedOperations(PRODUCT_MGMT);

  useEffect(() => {
    getOrganizations();
  }, []);

  const getOrganizations = async () => {

    try {
      setLoading(true);
      const resp = await getData("/org/list");
      setOrganizations(resp.contents);
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  };


  return (
    <Layout >
      <div className="adaMainContainer">
        {/* Breadcrumbs */}
        {/* Admin Panel Content */}
        <section className="adminControlContainer">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="pageTitle">
                  <h1>Product Management</h1>
                </div>
              </div>
              {loading ? <Loading /> : <div className="col-12">
                <div className="customerManagmentContainer">
                  <div className="accordion" id="customerManageViewList">
                    {organizations.map((item, index) => <div className="customerManagmentRepeater" key={index}>
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                          <div
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse${index}`}
                            aria-expanded="false"
                            aria-controls={`collapse${index}`}
                          >
                            <div className="customerManagmentShortView">
                              
                              <div className="orgTitle">{item.org_name}</div>
                              <OrganizationDetails org_id={item.org_id} />
                            </div>
                          </div>
                          {operationExist(operations, 1) && <div className="addNewService">
                            <a href={`/product-management/addproduct/${item.org_id}`} className="add">
                              <i className="fa-solid fa-plus"></i> Add Product
                            </a>
                          </div>}
                        </h2>
                        <div
                          id={`collapse${index}`}
                          className="accordion-collapse collapse"
                          aria-labelledby="headingOne"
                          data-bs-parent="#customerManageViewList"
                        >
                          <div className="accordion-body">
                            <ProductTable org_id={item.org_id} />
                              <ThirdPartyReportTable org_id={item.org_id} />

                          </div>
                        </div>
                      </div>
                    </div>
                    )}
                  </div>
                </div>
              </div>}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ProductManagement;