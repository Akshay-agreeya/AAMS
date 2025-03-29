import React from 'react';
import { getPercentValue, getProgressColor } from '../../../utils/Helper';



export const CategoryProgressBar = ({ summary = {} }) => {

    const percent = getPercentValue(summary.issues);

    return (
        <div class="overAllQyalityCircle" style={{ background: `conic-gradient(${getProgressColor(percent)} 0% ${percent}%, #E6F3FA ${percent}% 100%)` }}>
            <div class="overAllQyality-text">
                <span class="number">{`${percent}%`}</span>
                <span class="text">have issues better than average</span>
            </div>
        </div>
    )
}
