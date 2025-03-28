import React from 'react';
import { getPercentValue } from '../../../utils/Helper';

export const AccessibilityDashboard = ({ summary={} }) => {

const percent = getPercentValue(summary.issues);

    return (
        <div class="accessibilityCircle" style={{ background: `conic-gradient(#D61821 0% ${percent}%, #E6F3FA 85% 100%)` }}>
            <div class="accessibility-text">
                <span class="number">{`${percent}%`}</span>
                <span class="text">have issues, worse than average</span>
            </div>
        </div>
    )
}
