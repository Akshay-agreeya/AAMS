import React from 'react';
import { getPercentValue, getProgressColor } from '../../../utils/Helper';


export const AccessibilityDashboard = ({ summary = {} }) => {

    const percent = summary.accessibility_score;

    return (
        <div class="accessibilityCircle" style={{ background: `conic-gradient(${getProgressColor(percent)} 0% ${percent}%, #E6F3FA ${percent}% 100%)` }}>
            <div class="accessibility-text">
                <span class="number">{`${percent ||0}%`}</span>
                <span class="text">{summary.benchmark}</span>
            </div>
        </div>
    )
}
