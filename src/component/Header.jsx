import React from 'react';
import { CheckCircle, HelpCircle, Bell, ChevronDown } from 'lucide-react';
import './styles/Header.css';

export function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <CheckCircle className="header-logo" />
        <div className="header-brand">
          <h1 className="header-title">AAMS</h1>
          <p className="header-subtitle">AgreeYa Accessibility Monitoring System</p>
        </div>
      </div>
      <div className="header-right">
        <button className="icon-btn">
          <HelpCircle className="icon" />
        </button>
        <button className="icon-btn">
          <Bell className="icon" />
        </button>
        <button className="user-menu">
          <div className="user-avatar">JC</div>
          <span className="user-name">Jane Cooper</span>
          <ChevronDown className="icon-small" />
        </button>
      </div>
    </header>
  );
}
