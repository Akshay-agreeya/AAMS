import React from 'react';
import { getPercentValue } from '../../../utils/Helper';

export const CategoryProgressBar = ({ summary = {} }) => {
    const percent = getPercentValue(summary.benchmark); // keep your original percent extraction
    const benchmarkText = summary.benchmark?.replace(`${percent}%`, '').trim() || '';

    // Decide background color based on benchmarkText content
    const getCircleBackground = (text = '') => {
        const lowerText = text.toLowerCase();

        if (lowerText.includes('have issues, worse than average')) {
            return '#D61821'; // red
        }
        if (lowerText.includes('have issues, better than average')) {
            return '#41AF46'; // green
        }
        return '#E6F3FA'; // default background color
    };

    return (
        <div
            className="overAllQyalityCircle"
            style={{
                background: `conic-gradient(${getCircleBackground(benchmarkText)} 0% ${percent}%, #E6F3FA ${percent}% 100%)`,
              }}
        
        >
            <div className="overAllQyality-text">
                <span className="number">{`${percent}%`}</span>
                <span className="text">{benchmarkText}</span>
            </div>
        </div>
    );
};
