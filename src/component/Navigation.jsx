import React from 'react';
// import '../styles/Navigation.css';

export function Navigation() {
  const tabs = ['User Management', 'Customer Management', 'Reports'];
  const activeTab = 'Reports';

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`nav-tab ${tab === activeTab ? 'active' : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
