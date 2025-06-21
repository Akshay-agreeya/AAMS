import React from 'react';
import { getOrganizationIdFromSession, getPages, getPercentValue } from '../../../utils/Helper';
import { CategoryProgressBar } from './CategoryProgressBar';
import iconMoveForward from "../../../assets/images/iconMoveForward.svg"

export const OverAllQuality = ({ summary,reportData }) => {

    const percent = getPercentValue(summary.benchmark);
    const pages = getPages(summary.pages) || {};
    // const benchmarkText = summary.benchmark?.replace(`${percent}%`, '').trim() || '';
    const org_id = getOrganizationIdFromSession();

    return (

        <section className="overallQualityContainer">
            <div className="headingSection">
                <h4>Overall Quality</h4>
                <div className="moveNext">
                    <a href={`reports/listing/viewreport/${reportData?.assessment?.assessment_id}?tab=Accessibility&id=${reportData?.product?.service_id}&org_id=${org_id}`}><img src={iconMoveForward} alt="Click Here for next Page" /></a>
                </div>
            </div>
            <div className="graphContainer text-center">
                <div className="col-12 text-center">

                    <div className="overAllQyalityCircle">
                    <CategoryProgressBar summary={summary}/>
                    </div>

                </div>
            </div>
            <div className="commonErrorScoreContainer">
                <div className="score">{pages.pages} <span>pages</span></div>
                <div className="message">{pages.text}</div>

            </div>
            <div className="showHistoryContainer">
                    <a href="showHistory.html">Show History</a>
            </div>

        </section>
    )
}
