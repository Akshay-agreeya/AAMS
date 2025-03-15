import React from 'react';
import errorScore from '../../../assets/images/errorScore.svg';
import iconMoveForward from '../../../assets/images/iconMoveForward.svg';

export const Errors = () => {
    return (
        <section className="otherComplianceContainer errorContainer">
            <div className="headingSection">
                <h4>Errors</h4>
                <div className="moveNext">
                    <a href="#"><img src={iconMoveForward} alt="Click Here for next Page" /></a>
                </div>
            </div>
            <div className="graphContainer text-center">
                <img src={errorScore} alt="Error" />
            </div>
            <div className="commonErrorScoreContainer">
                <div className="score">2476 <span>pages</span></div>
                <div className="message">with broken links or other errors</div>

            </div>
            <div className="showHistoryContainer">
                <a href="#">Show History</a>
            </div>

        </section>
    )
}
