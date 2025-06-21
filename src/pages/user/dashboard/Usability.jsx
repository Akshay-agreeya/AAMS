import React from 'react';
import usabilityScore from '../../../assets/images/usabilityScore.svg';
import iconMoveForward from '../../../assets/images/iconMoveForward.svg';
import { getOrganizationIdFromSession, getPages } from '../../../utils/Helper';
import { CategoryProgressBar } from './CategoryProgressBar';

export const Usability = ({ summary,reportData }) => {

    const pages = getPages(summary.pages) || {};
    const org_id = getOrganizationIdFromSession();

    return (

        <section className="otherComplianceContainer usabilityContainer">
            <div className="headingSection">
                <h4>Usability</h4>
                <div className="moveNext">
                    <a href={`reports/listing/viewreport/${reportData?.assessment?.assessment_id}?tab=Usability&id=${reportData?.product?.service_id}&org_id=${org_id}`}><img src={iconMoveForward} alt="Click Here for next Page" /></a>
                </div>
            </div>
            <div className="graphContainer text-center">
                <CategoryProgressBar summary={summary} />
            </div>
            <div className="commonErrorScoreContainer">
                <div className="score">{pages.pages} <span>pages</span></div>
                <div className="message">{pages.text}</div>

            </div>
            <div className="showHistoryContainer">
                <a href="#">Show History</a>
            </div>

        </section>
    )
}
