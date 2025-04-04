import React from 'react'
import { getPages } from '../../../utils/Helper';

const AccessibilityErrorScore = ({ summary }) => {

    const pages = summary?.pages?getPages(summary.pages):{};

    return (
        <div className="accessibilityErrorScoreContainer">
            <div className="score">{pages.pages || 0}</div>
            <div className="message">pages with<br /> {pages.textParts?.slice(3)?.join(" ")?.trim()||' accessibility problems'}</div>
        </div>
    )
}

export default AccessibilityErrorScore;