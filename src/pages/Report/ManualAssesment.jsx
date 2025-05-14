import { useEffect, useRef, useState } from 'react';
import Layout from '../../component/Layout';
import { getData, postData } from '../../utils/CommonApi';
import Loading from '../../component/Loading';
import Form from '../../component/form/Form';
import { FormItem } from '../../component/form/FormItem';
import { Input } from '../../component/input/Input';
import { useParams } from 'react-router-dom';
import { MANUAL_ASSESSMENT_SAVE_SUCCESS_MSG } from '../../constants/MessageConstants';
import notification from '../../component/notification/Notification';

const ManualTesting = () => {
  const [loading, setLoading] = useState(false);
  const [seedData, setSeedData] = useState({});
  const [formDataManual, setFormDataManual] = useState([]);
  const formRef = useRef();

  const { product_id } = useParams();

  useEffect(() => {
    const getSeedData = async () => {
      try {
        setLoading(true);
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

  const handleSubmit = async () => {
    try {
      await postData(`/manual/add/${product_id}`, {formData: formDataManual});
      notification.success({
        title: "Add Manual Assessment",
        message: MANUAL_ASSESSMENT_SAVE_SUCCESS_MSG,
      });
    }
    catch (error) {
      console.log(error);
    }
  };

  const handleChange = (status_id, condition_id) => {
    const newData = formDataManual.filter(item => item.condition_id !== condition_id);
    setFormDataManual([...newData, { condition_id, status_id }]);
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
                <div className="col-12">
                  <div className="userManagmentContainer">
                    <div className="accordion" id="userManageList">
                      <div className="userManagmentRepeater">
                        <Form onSubmit={handleSubmit} ref={formRef}>
                          {seedData.categories?.map((category) => (
                            <div className="accordion-item mb-3" key={category.category_id}>
                              <h2 className="accordion-header" id={`heading${category.category_id}`}>
                                <div
                                  className="accordion-button collapsed"
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
                                className="accordion-collapse collapse"
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
                                          <h4>{q.condition}</h4>
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
                              <a href="/user-management" className="btnCancel">Cancel</a>
                              <button type="submit" className="btnAddUser">
                                Add Assessment
                              </button>
                            </div>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ManualTesting;
