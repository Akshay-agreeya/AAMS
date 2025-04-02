import React, { useEffect, useState } from "react";
import Layout from "../../../component/Layout";
import Pagenation from "../../../component/Pagenation";
import { getData } from "../../../utils/CommonApi"; 

const MyProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getData("/report/get/user-urls"); 
        if (response.success) {
          setProducts(response.contents); 
        } else {
          console.error("Failed to fetch product data:", response.message);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Layout>
      <section className="mySitesGridContainer">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="pageTitle">
                <h1>My Product</h1>
              </div>
              <div className="gridContainer">
                <table>
                  <thead>
                    <tr>
                      <th scope="col" width="30%">Product Name</th>
                      <th scope="col" width="35%">URL</th>
                      <th scope="col" width="15%" className="text-center">No of Report</th>
                      <th scope="col" width="20%">Last Scanned</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length > 0 ? (
                      products.map((product, index) => (
                        <tr key={index}>
                          <td scope="row">{product.service_type || "N/A"}</td> 
                          <td>
                            <a href={product.web_url} target="_blank" rel="noopener noreferrer">
                              {product.web_url}
                            </a>
                          </td>
                          <td className="text-center">{product.total_assessments}</td>
                          <td>{new Date(product.assessment_date).toLocaleDateString()}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">No products found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination Section */}
            <div className="col-12">
              <Pagenation/>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MyProduct;
