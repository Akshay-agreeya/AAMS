import React, { useCallback, useEffect, useRef, useState } from 'react'
import Layout from '../../../component/Layout'
import { useLocation } from 'react-router-dom';

const ReportView = () => {

    const [selectedUrl, setSelectedUrl] = useState("/assets/dummyReport/map.ACC.htm");

    const iframeRef = useRef(null);
    const location = useLocation();

    const fileName = location.state?.fileName;

    const frameLoad = useCallback(() => {
        const iframe = iframeRef.current;
        if (iframe) {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
            if (!iframeDoc) {
                console.warn('Could not access iframe content');
                return;
            }

            // Inject CSS
            const style = iframeDoc.createElement('link');
            style.rel = 'stylesheet';
            style.href = '/assets/css/style/iframeReport.css'; // Absolute path to your CSS file
            iframeDoc.head.appendChild(style);

            // Ensure all links open in a new window
            iframeDoc.querySelectorAll('a').forEach(link => {
                //link.setAttribute('target', '_blank');
                //link.setAttribute('rel', 'noopener noreferrer');
            });

            // Handle dynamically added links using event delegation
            iframeDoc.body.addEventListener('click', function (event) {
                let link = event.target.closest('a');
                if (link && link.href) {
                    event.preventDefault();
                   setSelectedUrl(link.href);
                }
            });
        }
    }, []);

    useEffect(() => {
        const iframe = iframeRef.current;
        if (iframe) {
            iframe.onload = () => {
                try {
                    frameLoad();
                } catch (error) {
                    console.error('Error loading iframe:', error);
                }
            };
        }
    }, [frameLoad]);

    const breadcrumbs = [{ url: "/user/dashboard", label: "Home" },
        { url: "/user/reports/listing", label: "Report" },{ label: fileName }
    ];

    return (
        <Layout breadcrumbs={breadcrumbs}>
            <div className="adaMainContainer">

                <section className="myReportsGridContainer">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="pageTitle">
                                    <h1>Accessibility Report - AQMD Site Assessment Report-9</h1>
                                    <div className="viewReportContainer">
                                        <iframe ref={iframeRef} width="100%" height="600" src={selectedUrl} id="iframReportgen"></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </section>



            </div>
        </Layout>
    )
}

export default ReportView