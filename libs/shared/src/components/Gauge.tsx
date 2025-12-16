import React, { useMemo } from 'react';
import './Gauge.css';

interface GaugeProps {
  score: number;
}

export const Gauge: React.FC<GaugeProps> = ({ score }) => {
  const normalizedRotation = useMemo(() => {
    // Calculate rotation angle based on score (-100 to 100 maps to -180deg to 0deg)
    const rotation = ((score + 100) / 200) * 180 - 90;
    return Math.max(-90, Math.min(90, rotation));
  }, [score]);

  return (
    <div className="gauge">
      <div className="gauge__container">
        <div
          className="gauge__needle"
          style={{ '--rotation': `${normalizedRotation}deg` } as React.CSSProperties}
        ></div>
      </div>
      <div className="gauge__score">
        <div className="gauge__score-value">{score}</div>
        <div className="gauge__score-label">VIBE SCORE</div>
      </div>
      <div className="gauge__emoji">
        <span>☹️</span>
        <span>😃</span>
      </div>
    </div>
  );
};

