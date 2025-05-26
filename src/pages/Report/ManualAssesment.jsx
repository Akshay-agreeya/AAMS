import { use, useEffect, useRef, useState } from 'react';
import Layout from '../../component/Layout';
import { getData, postData } from '../../utils/CommonApi';
import Loading from '../../component/Loading';
import Form from '../../component/form/Form';
import { FormItem } from '../../component/form/FormItem';
import { Input } from '../../component/input/Input';
import { useNavigate, useParams } from 'react-router-dom';
import { MANUAL_ASSESSMENT_SAVE_SUCCESS_MSG, OPERATION_FAILED_MSG } from '../../constants/MessageConstants';
import notification from '../../component/notification/Notification';
import { urlPattern } from '../../constants';

const ManualAssessment = () => {
  const [loading, setLoading] = useState(false);
  const [seedData, setSeedData] = useState({});
  const [formDataManual, setFormDataManual] = useState([]);
  const [productData, setProductData] = useState({});
  const [assessmentData, setAssessmentData] = useState([]);
  const formRef = useRef();

  const { product_id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {

    const getSeedData = async () => {
      try {
        setLoading(true);
        const productResp = await getData(`/product/view/${product_id}`);
        setProductData(productResp);
        const resp = await getData("/manual/get");
        setSeedData(resp.contents);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getSeedData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
      popoverTriggerList.map((popoverTriggerEl) => {
        return new window.bootstrap.Popover(popoverTriggerEl)
      });
    }, 100);
  }, [seedData]);

  const handleSubmit = async (formData) => {
    if (assessmentData.length === 0)
      if (!validateForm())
        return;
    if (assessmentData.length > 0 && formDataManual.length > 0)
      if (!validateForm())
        return;

    try {
      const tempData = assessmentData.filter(item => item.pageUrl !== formData.page_url);
const reqData = [...tempData, { pageUrl: formData.page_url, formData: formDataManual }];

await postData(`/manual/add/${product_id}`, { assessmentData: reqData });

      notification.success({
        title: "Add Manual Assessment",
        message: MANUAL_ASSESSMENT_SAVE_SUCCESS_MSG,
      });
      navigate("/product-management");
    }
    catch (error) {
      console.log(error);
      notification.error({
        title: "Error",
        message: error?.data?.errors?.[0] || OPERATION_FAILED_MSG,
      });
    }
  };

  const handleAddMore = async () => {
    const page_url = formRef.current.getFieldValue("page_url");
    if (!page_url) {
      formRef.current.setFieldsError({ page_url: "Page URL is required" });
      return;
    }
    if (!validateForm())
      return;
    try {
      const tempData = assessmentData.filter(item => item.page_url !== page_url);
      const reqData = { pageUrl: page_url, formData: formDataManual }
      setAssessmentData([...tempData, reqData]);
      setFormDataManual([]);
      formRef.current.setFieldValue("page_url", "");
    }
    catch (error) {
      console.log(error);
    }
  };

  const validateForm = () => {
    let status = true;

    // Deep copy to avoid direct state mutation
    const clonedSeedData = JSON.parse(JSON.stringify(seedData));

    clonedSeedData?.categories?.forEach(item => {
      item.conditions.forEach(condition => {
        const isAnswered = formDataManual?.find(fItem => fItem.condition_id === condition.condition_id);
        if (!isAnswered) {
          status = false;
          condition.error = true;
        } else {
          condition.error = false;
        }
      });
    });

    setSeedData(clonedSeedData);
    return status;
  };


  const handleChange = (status_id, condition_id) => {
    // Update formDataManual
    const updatedFormData = formDataManual.filter(item => item.condition_id !== condition_id);
    updatedFormData.push({ condition_id, status_id });
    setFormDataManual(updatedFormData);

    // Deep clone seedData to safely modify condition.error
    const updatedSeedData = JSON.parse(JSON.stringify(seedData));
    updatedSeedData.categories.forEach(category => {
      category.conditions.forEach(cond => {
        if (cond.condition_id === condition_id) {
          cond.error = false;
        }
      });
    });

    setSeedData(updatedSeedData);
  };


  const isChecked = (condition_id, status_id) => {
    const check = formDataManual.some(
      item => item.condition_id === condition_id && item.status_id === status_id
    );
    return check;
  };


  return (
    <Layout>
      <div className="adaMainContainer">
        <section className="adminControlContainer">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="pageTitle">
                  <h1>Manual Testing</h1>
                </div>
              </div>

              {loading ? (
                <Loading />
              ) : (
                <>
                  <Form onSubmit={handleSubmit} ref={formRef}>
                    <div className="col-12">
                      <div className="row mb-4 align-items-center justify-content-between">
                        <div className="col-auto">
                          <div className="d-flex align-items-center">
                            <h3 className="mb-0 me-3">Website Accessibility - <a href={productData?.web_url} className="text-dark text-decoration-underline">{productData?.web_url}</a></h3>
                            <div className=""></div>
                          </div>
                        </div>

                        <div className="col-5">
                          <div className="d-flex align-items-center ">
                            <h4 className="mb-0 w-25">Page URL:</h4>
                            <div className="w-100">
                              <FormItem name="page_url" rules={[{
                                required: assessmentData.length === 0 || formDataManual.length > 0,
                                message: "Page URL is required",
                                pattern: urlPattern
                              }]}>
                                <Input type="text" id="exampleFormControlInput1"
                                  placeholder="https://abc.com/about/" aria-label="website Page URL" />
                              </FormItem></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="userManagmentContainer">
                        <div className="accordion" id="userManageList">
                          <div className="userManagmentRepeater">

                            {seedData.categories?.map((category, i) => (
                              <div className="accordion-item mb-3" key={category.category_id}>
                                <h2 className="accordion-header" id={`heading${category.category_id}`}>
                                  <div
                                    className={`accordion-button  ${i !== 0 ? 'collapsed' : ''} ${category.conditions?.filter(item => item.error).length > 0 ? "error" : ""} `}
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#collapse${category.category_id}`}
                                    aria-expanded="false"
                                    aria-controls={`collapse${category.category_id}`}
                                  >
                                    <div className="userManagmentShortView">
                                      <div className="manageOrg">
                                        <div className="arrowDown me-2">
                                          <i className="fa-solid fa-caret-down"></i>
                                        </div>
                                        <div className="title">{category.category}</div>
                                      </div>
                                    </div>
                                  </div>
                                </h2>

                                <div
                                  id={`collapse${category.category_id}`}
                                  className={`accordion-collapse collapse ${i === 0 ? 'show' : ''}`}
                                  aria-labelledby={`heading${category.category_id}`}
                                  data-bs-parent="#userManageList"
                                >
                                  <div className="accordion-body">
                                    <div className="p-4 manualAccContainer">
                                      <FormItem name="category_id">
                                        <Input type="hidden" value={category.category_id} />
                                      </FormItem>

                                      <div className="row gx-0">
                                        {category.conditions.map((q, index) => (
                                          <div className="col-md-12 col-12 border-bottom pb-3 mb-3" key={q.condition_id}>
                                            <h4>
                                              {q.condition}
                                              <span role="button" className="text-primary"
                                                tabIndex={index} data-bs-toggle="popover"
                                                data-bs-trigger="focus" title="Remidiation"
                                                data-bs-content="Ensure that all meaningful images are provided with descriptive alternative text (alt text) that accurately represents their content and purpose, enhancing accessibility for visually impaired users."><i
                                                  className="bi bi-info-circle-fill ms-2"></i></span>
                                              <span role="button" className="text-primary" tabIndex={index}
                                                data-bs-toggle="popover" data-bs-trigger="focus"
                                                title="Remidiation"
                                                data-bs-content="Inspect images using screen reader tools or browser dev tools to ensure alt text describes the image's purpose."><i
                                                  className="bi bi-question-circle-fill ms-2"></i></span>

                                            </h4>
                                            <div className="checkBoxOptionContainer d-flex">
                                              {seedData.status?.map((option, optIdx) => {
                                                const inputId = `q${index}_${option.status.replace(/\s+/g, '')}`;
                                                return (
                                                  <div className="form-check me-5" key={optIdx}>

                                                    <input
                                                      className="form-check-input"
                                                      type="radio"
                                                      value={option.manual_assessment_status_id}
                                                      name={`accessibilityOption_${q.condition_id}`}
                                                      checked={isChecked(q.condition_id, option.manual_assessment_status_id)}
                                                      id={inputId}
                                                      onChange={() => handleChange(option.manual_assessment_status_id, q.condition_id)}
                                                    />
                                                    <label className="form-check-label" htmlFor={inputId}>
                                                      {option.status}
                                                    </label>
                                                  </div>
                                                );
                                              })}
                                            </div>
                                            {q.error && <div className="alert alert-danger" role="">Select status</div>}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}

                            {/* Button Section */}
                            <div className="col-12">
                              <div className="buttonBox">
                                <a href="/product-management" className="btnCancel">Cancel</a>
                                <button type="submit" className="btnAddUser">
                                  Submit
                                </button>
                                <button type="button"
                                  className="btn btn-sm ms-2 btn-success px-3"
                                  onClick={handleAddMore}>Add More</button>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                </>
              )}

            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ManualAssessment;
