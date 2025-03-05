import React from 'react'

const Loading = () => {
  return (
    <div className="dataLoadContainer">
            <div className="progressBarContainer">
              <div className="message">Loading data, please wait...</div>
              <div className="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: "55%" }}></div>
              </div>
            </div>
          </div>
  )
}

export default Loading;
