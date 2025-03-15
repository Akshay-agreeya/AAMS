import React from 'react';
import usabilityScore from '../../../assets/images/usabilityScore.svg';
import iconMoveForward from '../../../assets/images/iconMoveForward.svg';

export const Usability = () => {
    
    return (

        <section className="otherComplianceContainer usabilityContainer">
            <div className="headingSection">
                <h4>Usability</h4>
                <div className="moveNext">
                    <a href="#"><img src={iconMoveForward} alt="Click Here for next Page" /></a>
                </div>
            </div>
            <div className="graphContainer text-center">
                <img src={usabilityScore} alt="Usability" />
            </div>
            <div className="commonErrorScoreContainer">
                <div className="score">3127 <span>pages</span></div>
                <div className="message">with usability issues</div>

            </div>
            <div className="showHistoryContainer">
                <a href="#">Show History</a>
            </div>

        </section>
    )
}
