import React, { useState, useEffect, useMemo } from 'react';
import { TEAMS, teamDataConfig, Team } from '@heelix-workspace/shared';
import './FactorAnalysis.css';

const FactorAnalysis: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<Team>('Engineering Product');
  const [showTeamDropdown, setShowTeamDropdown] = useState<boolean>(false);

  const teamData = useMemo(() => {
    return teamDataConfig[selectedTeam];
  }, [selectedTeam]);

  const factors = useMemo(() => {
    return teamData.factorData;
  }, [teamData]);

  useEffect(() => {
    // Handle document clicks to close dropdown
    if (!showTeamDropdown) return;

    const handler = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.team-dropdown-container')) {
        setShowTeamDropdown(false);
      }
    };

    document.addEventListener('click', handler);
    return () => {
      document.removeEventListener('click', handler);
    };
  }, [showTeamDropdown]);

  const selectTeam = (team: Team) => {
    setSelectedTeam(team);
    setShowTeamDropdown(false);
  };

  return (
    <div className="factor-analysis">
      <div className="factor-analysis__container">
        {/* Header */}
        <h1 className="factor-analysis__header">Factor analysis</h1>

        {/* Filters */}
        <div className="factor-analysis__filters">
          <div className="factor-analysis__filters-dropdown team-dropdown-container">
            <button
              className="factor-analysis__filters-dropdown-button"
              onClick={() => setShowTeamDropdown(!showTeamDropdown)}
            >
              <span>{selectedTeam} ▼</span>
            </button>
            {showTeamDropdown && (
              <div className="factor-analysis__filters-dropdown-menu">
                {TEAMS.map((team) => (
                  <button key={team} onClick={() => selectTeam(team)}>
                    <span>{team}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="factor-analysis__filters-period">
            <span>Last 30 days ▼</span>
          </button>
        </div>

        {/* Factor Grid */}
        <div className="factor-analysis__grid">
          {factors.map((factor) => (
            <div key={factor.name} className="factor-analysis__grid-item">
              <div
                className="factor-analysis__grid-item-bar"
                style={{ backgroundColor: factor.color }}
              ></div>
              <div className="factor-analysis__grid-item-name">{factor.name}</div>
              <div className="factor-analysis__grid-item-value">{factor.value}%</div>
              <div className="factor-analysis__grid-item-progress">
                <div
                  className="factor-analysis__grid-item-progress-fill"
                  style={{
                    width: `${factor.value}%`,
                    backgroundColor: factor.color,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FactorAnalysis;

