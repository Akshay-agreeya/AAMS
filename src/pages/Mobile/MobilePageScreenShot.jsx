import React, { useEffect, useState } from 'react'
import { getData } from '../../utils/CommonApi';

const MobilePageScreenShot = ({mobile_screen_report_id}) => {

    const [screenShotUrl, setScreenShotUrl] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
          if (mobile_screen_report_id) {
            fetchScreenShot();
          }
        }, [mobile_screen_report_id]);
      
        const fetchScreenShot = async () => {
          try {
            setLoading(true);
            const res = await getData(`/report/get/screenshot/${mobile_screen_report_id}`);
            setScreenShotUrl(res);
          } catch (err) {
            console.error("Failed to fetch summary report:", err);
          } finally {
            setLoading(false);
          }
        };

    return (
        <div className="col-lg-3 col-md-4 col-12">
            <h2>Home Page ScreenShot</h2>
            <div className="card">
                <div className="card-body">
                    {/* Replace src with imported image if available */}
                    <img src={`data:image/png;base64,${screenShotUrl}`} className="img-fluid border" alt="Mobile Screenshot" style={{ objectFit: "contain" }} />
                </div>
            </div>
        </div>
    )
}

export default MobilePageScreenShot;