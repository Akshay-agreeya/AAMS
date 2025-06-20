import { useEffect, useState } from 'react';
import Layout from './Layout';

const AssessmentProgress = () => {

    const [assessmentStatus, setAssessmentStatus] = useState('loading'); // 'loading', 'in-progress', 'completed', 'error'
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleMessage = (event) => {
            // Verify origin for security
            if (event.origin !== window.location.origin) {
                return;
            }

            if (event.data.type === 'ASSESSMENT_COMPLETE') {
                setAssessmentStatus('completed');

                if (!event.data.success) {
                    setError('Assessment completed with errors');
                }
            } else if (event.data.type === 'ASSESSMENT_ERROR') {
                setAssessmentStatus('error');
                setError(event.data.message || 'An error occurred during assessment');
            } else if (event.data.type === 'ASSESSMENT_STARTED') {
                setAssessmentStatus('in-progress');
            }
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);


    const renderContent = () => {
        switch (assessmentStatus) {
            case 'loading':
                return (
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center" style={{ height: "calc(100vh - 245px)" }}>
                                <div className="d-flex justify-content-center align-items-center h-100 flex-column ">
                                    <div className="spinner-border text-loader"
                                        style={{ width: "10rem", height: "10rem", borderWidth: "0.7em" }} role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <h1 className="mt-4 fs-1 text-light">Generating your report...</h1>
                                    <p className="text-light fs-5 text-center" style={{ maxWidth: "500px" }}>
                                        This may take a few moments.
                                        Please don’t close this tab. It will close automatically once the report is ready.
                                        You’ll see a confirmation in the previous tab.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                );

            case 'completed':
                return (
                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Assessment Completed!</h3>
                    </div>
                );

            case 'error':
                return (
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Assessment Error</h3>
                        <p className="text-red-600 mb-4">{error}</p>
                    </div>
                );

            default:
                return (
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading...</p>
                    </div>
                );
        }
    };

    return (    
           
            <Layout breadcrumbs={[]}>
                <div class="adaMainContainer">
                    <section className="adminControlContainer" style={{ zIndex: 1025 }}>
                        {renderContent()}
                    </section>
                </div>
                 <div className="modal-backdrop fade show" style={{ zIndex: 1024, opacity: "0.8" }}></div>
            </Layout>
    );
};

export default AssessmentProgress;