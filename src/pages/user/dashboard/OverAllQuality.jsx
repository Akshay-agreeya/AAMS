import React from 'react';
import iconMoveForward from '../../../assets/images/iconMoveForward.svg';
import overallQualityScore from '../../../assets/images/overallQualityScore.svg';

export const OverAllQuality = () => {
    return (

        <section className="overallQualityContainer">
            <div className="headingSection">
                <h4>Overall Quality</h4>
                <div className="moveNext">
                    <a href="showHistory.html"><img src={iconMoveForward} alt="Click Here for next Page" /></a>
                </div>
            </div>
            <div className="graphContainer text-center">
                <div class="col-12 text-center">

                    <div class="overAllQyalityCircle">
                        <div class="overAllQyality-text">
                            <span class="number">83%</span>
                            <span class="text">have issues, worse than average</span>
                        </div>
                    </div>

                </div>
            </div>
            <div className="commonErrorScoreContainer">
                <div className="score">18255 <span>pages</span></div>
                <div className="message">with quality issues</div>

            </div>
            <div className="showHistoryContainer">
                <a href="showHistory.html">Show History</a>
            </div>

        </section>
    )
}
