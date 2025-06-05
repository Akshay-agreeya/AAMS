import { useEffect, useState } from 'react';

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
                    <div className="text-center mt-5">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <h3>Processing</h3>
                        <div className="mt-4 space-y-4 mt-3">
                            <p className="text-gray-600">Waiting for parsing accessibility report...</p>
                        </div>
                        <div className="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                            <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: "55%" }}></div>
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
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            {/* Main Status Card */}
            {renderContent()}
        </div>
    );
};

export default AssessmentProgress;