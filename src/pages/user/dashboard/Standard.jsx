import React from 'react';
import iconMoveForward from '../../../assets/images/iconMoveForward.svg';
import iconStandardScore from '../../../assets/images/standardScore.svg';
import { getPages, getPercentValue } from '../../../utils/Helper';

export const Standard = ({summary}) => {

    const percent = getPercentValue(summary.issues);
        const pages = getPages(summary.pages) || {};

    return (

        <section className="otherComplianceContainer standardContainer">
            <div className="headingSection">
                <h4>Standard</h4>
                <div className="moveNext">
                    <a href="#"><img src={iconMoveForward} alt="Click Here for next Page" /></a>
                </div>
            </div>
            <div className="graphContainer text-center">
                <img src={iconStandardScore} alt="Standard" />
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
