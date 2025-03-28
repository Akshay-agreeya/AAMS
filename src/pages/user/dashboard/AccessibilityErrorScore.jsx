import React from 'react'
import { getPages } from '../../../utils/Helper';

const AccessibilityErrorScore = ({ summary }) => {

    const pages = getPages(summary.pages);

    return (
        <div className="accessibilityErrorScoreContainer">
            <div className="score">{pages.pages}</div>
            <div className="message">page with<br /> {pages.textParts?.slice(3)?.join(" ")?.trim()}</div>
        </div>
    )
}

export default AccessibilityErrorScore;