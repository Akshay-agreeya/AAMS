import React from 'react';
import { getPages, getPercentValue } from '../../../utils/Helper';
import { CategoryProgressBar } from './CategoryProgressBar';

export const OverAllQuality = ({ summary }) => {

    const percent = getPercentValue(summary.benchmark);
    const pages = getPages(summary.pages) || {};
    const benchmarkText = summary.benchmark?.replace(`${percent}%`, '').trim() || '';

    return (

        <section className="overallQualityContainer">
            <div className="headingSection">
                <h4>Overall Quality</h4>
                <div className="moveNext">
                    {/* <a href="showHistory.html"><img src={iconMoveForward} alt="Click Here for next Page" /></a> */}
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
            {/* <div className="showHistoryContainer">
                    <a href="showHistory.html">Show History</a>
            </div> */}

        </section>
    )
}
