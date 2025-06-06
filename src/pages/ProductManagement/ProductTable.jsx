import React, { useEffect, useRef, useState } from 'react'
import Table from '../../component/table/Table';
import { deleteData, getData, postData } from '../../utils/CommonApi';
import { formattedDate, getFormattedDateWithTime } from '../../component/input/DatePicker';
import editicon from "../../assets/images/iconEdit.svg";
import deleteicon from "../../assets/images/iconDelete.svg";
import viewicon from "../../assets/images/iconView.svg";
import manualTestingIcon from "../../assets/images/manual-testing.svg";
import browseIcon from "../../assets/images/browseIcon.svg";
import iconDocument from "../../assets/images/iconDocument.svg";
import { getAllowedOperations, getPagenationFromResponse, getUserEmailFromSession, isSuperAdmin } from '../../utils/Helper';
import DeleteConfirmationModal from '../../component/dialog/DeleteConfirmation';
import notification from '../../component/notification/Notification';
import { useNavigate } from 'react-router-dom';
import { DATE_FORMAT, PRODUCT_MGMT, TABLE_RECORD_SIZE } from '../../utils/Constants';
import { handleClick, handleFileChange } from '../../utils/ReportFileUpload';
import "./Spinner.css";
import FreeLiteAssessmentUrlInputDialog from '../../component/dialog/FreeLiteAssessmentUrlInputDialog';

const ProductTable = ({ org_id }) => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagenation, setPagenation] = useState({});
    const [openProductDeleteModal, setOpenProductDeleteModal] = useState();
    const [openUrlModal, setOpenUrlModal] = useState();
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [selectedRecord, setSelectedRecord] = useState({});
    const superAdmin = isSuperAdmin();

    const userEmail = getUserEmailFromSession();
    const fileInputRef = useRef(null);


    const navigate = useNavigate();

    useEffect(() => {
        if (org_id)
            getProducts();
    }, [org_id]);

    const getProducts = async (page = 1) => {
        try {
            setLoading(true);
            const resp = await getData(`/product/get/${org_id}?page=${page}&size=${TABLE_RECORD_SIZE}`);
            if (resp.contents) {
                resp.contents = resp.contents?.map((item, index) => ({ ...item, id: index + 1 }));
            }
            setProducts(resp.contents);
            setPagenation(getPagenationFromResponse(resp));
        } catch (error) {
            console.error("Error fetching products:", error);
        }
        finally {
            setLoading(false);
        }
    };

    const operations = getAllowedOperations(PRODUCT_MGMT);

    const columns = [{
        title: 'Product Name',
        dataIndex: 'service_type_name',
        width: '18%'
    },
    {
        title: 'Resource Path',
        dataIndex: 'web_url',
        width: '14%'
    },
    {
        title: 'WCAG',
        dataIndex: 'guideline',
        width: '8%',
        className: "text-center"
    },

    {
        title: 'Version',
        dataIndex: 'guidline_version_id',
        width: '5%',
        className: "text-center"
    },
    {
        title: 'Compliance Level',
        dataIndex: 'compliance_level',
        width: '8%',
        className: "text-center"
    },
    {
        title: 'Frequency',
        dataIndex: 'frequency',
        width: '7%',
        className: "text-center"
    },
    {
        title: 'Day',
        dataIndex: 'scan_days',
        width: '8%',
        className: "text-center",
        render: (text, record) => (
            <span>{record.frequency_id === 3 ? record.next_scan_date ? formattedDate(new Date(record.next_scan_date), DATE_FORMAT)
                : formattedDate(new Date(record.last_scan_date), DATE_FORMAT) : text}</span>
        )
    },

    {
        title: 'Scan Date',
        dataIndex: 'next_scan_date',
        width: '19%',
        className: "text-center",
        render: (text) => (
            <span>{text ? formattedDate(new Date(text), DATE_FORMAT) : 'NA'}</span>
        )
    },

    {
        title: 'Schedule Time',
        dataIndex: 'schedule_time',
        width: '8%',
        className: "text-center",
        render: (text) => (
            <span>{getFormattedDateWithTime(new Date(text), " HH:mm")}</span>
        )
    },

    {
        title: "Action",
        dataIndex: "action",
        width: "8%",
        className: "text-center text-nowrap",
        render: (_text, record) => (
            <>
                {superAdmin && <a title="FreeLiteAssessment" href={`#`}
                    className="me-3" onClick={(e) => {
                        e.preventDefault();
                        handleFreeLiteAssessment(record);
                    }}>
                    <img src={iconDocument} alt="FreeLiteAssessment" />
                </a>}
                {superAdmin && <> <a title="Browse Files" href={`#`}
                    className="me-3" onClick={(e) => { setSelectedRecord(record); handleClick(e, fileInputRef) }}>
                    <img src={browseIcon} alt="View Details" />
                </a>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={(event) => {
                            handleFileChange(event, selectedRecord, org_id, setLoading)
                        }}
                    /></>}
                {operations?.find(item => item.operation_type_id === 3) && <a title="Manual Assessment" href={`/product-management/add-manual-report/${record.service_id}`} className="me-3">
                    <img src={manualTestingIcon} alt="Manual Testing" />
                </a>}
                {operations?.find(item => item.operation_type_id === 3) && <a title="View Details" href={`/product-management/viewproduct/${record.service_id}`} className="me-3">
                    <img src={viewicon} alt="View Details" />
                </a>}

                {operations?.find(item => item.operation_type_id === 2) && <a title="Edit Details" href={`/product-management/editproduct/${record.service_id}`} className="me-3">
                    <img src={editicon} alt="Edit Details" />
                </a>
                }
                {operations?.find(item => item.operation_type_id === 4) && <a title="Delete Details" href="#" onClick={() => {
                    setSelectedProductId(record.service_id);
                    setOpenProductDeleteModal(true);
                }}>
                    <img src={deleteicon} alt="Delete Details" />
                </a>
                }
            </>
        ),
    },
    ];

    const handleDelete = async () => {
        try {
            const resp = await deleteData(`/product/delete/${selectedProductId}`);
            notification.success({
                title: `Delete Product`,
                message: resp.message
            });
            navigate(0);
        }
        catch (error) {
            notification.error({
                title: 'Delete Product',
                message: error.data?.error
            });
        }
    }

    const handleFreeLiteAssessment = async (record) => {
        let message = "";
        try {
           // setLoading(true);
            const newTab = window.open('/assessment-progress', '_blank');
            const formData = { freeLiteAssessmentUrl: record.web_url, service_id: record?.service_id, org_id };
            const resp = await postData(`/misc/free-lite-assessment`, formData);
            // Send success message to new tab
            if (newTab && !newTab.closed) {
               newTab.close();
            }
            notification.success({
                title: 'FreeLiteAssessment',
                message: resp.message || 'FreeLiteAssessment successfully completed'
            });
        } catch (err) {
            message = err.response.data.message;
            notification.error({
                title: 'FreeLiteAssessment',
                message
            });
        }
    }

    return (
        <>
            <Table columns={columns} dataSource={products} rowKey="user_id" loading={loading}
                pagenation={{ ...pagenation, onChange: getProducts }} />
            <DeleteConfirmationModal
                modalId="deleteProductModal"
                open={openProductDeleteModal}
                onDelete={handleDelete}
                onClose={() => { setOpenProductDeleteModal(false) }}
            />
        </>
    )
}

export default ProductTable