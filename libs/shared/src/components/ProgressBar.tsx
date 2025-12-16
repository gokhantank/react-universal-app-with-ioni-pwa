import React, { useMemo } from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
  label: string;
  value: number;
  color: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ label, value, color }) => {
  const normalizedValue = useMemo(() => {
    // Normalize value from -100 to 100 range to 0-100% for display
    return ((value + 100) / 200) * 100;
  }, [value]);

  return (
    <div className="progress-bar">
      <div className="progress-bar__header">
        <span className="progress-bar__header-label">{label} (?)</span>
      </div>
      <div className="progress-bar__track">
        <div
          className="progress-bar__fill"
          style={
            {
              '--width': `${normalizedValue}%`,
              '--fill-color': color,
            } as React.CSSProperties
          }
        ></div>
        <div
          className="progress-bar__indicator"
          style={{ '--indicator-left': `${normalizedValue}%` } as React.CSSProperties}
        ></div>
      </div>
      <div className="progress-bar__labels">
        <span className="progress-bar__labels-text">-100</span>
        <span className="progress-bar__labels-text">100</span>
      </div>
    </div>
  );
};

