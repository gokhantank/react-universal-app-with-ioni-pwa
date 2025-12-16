import React, { useState, useEffect, useMemo } from 'react';
import {
  Card,
  Gauge,
  ProgressBar,
  TakeActionModal,
  TEAMS,
  teamDataConfig,
  Team,
} from '@heelix-workspace/shared';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<Team>('Engineering Product');
  const [showTeamDropdown, setShowTeamDropdown] = useState<boolean>(false);
  const [showTakeActionModal, setShowTakeActionModal] = useState<boolean>(false);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

  const teamData = useMemo(() => {
    return teamDataConfig[selectedTeam];
  }, [selectedTeam]);

  useEffect(() => {
    // Check screen size on initialization
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth > 800);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

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
    <div className="dashboard">
      <div className="dashboard__container">
        {/* HEADER */}
        <div className="dashboard__header">
          <div className="dashboard__header-title">
            <h1>Insights dashboard</h1>
          </div>
          <button
            className="dashboard__header-button"
            onClick={() => setShowTakeActionModal(true)}
          >
            Take action
          </button>
        </div>

        {/* FILTERS */}
        <div className="dashboard__filters">
          <div className="dashboard__filters-dropdown team-dropdown-container">
            <button
              className="dashboard__filters-dropdown-button"
              onClick={() => setShowTeamDropdown(!showTeamDropdown)}
            >
              <span>{selectedTeam} ▼</span>
            </button>
            {showTeamDropdown && (
              <div className="dashboard__filters-dropdown-menu">
                {TEAMS.map((team) => (
                  <button key={team} onClick={() => selectTeam(team)}>
                    <span>{team}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="dashboard__filters-period">
            <span>Last 30 days ▼</span>
          </div>
        </div>

        {/* TOP SECTION: GAUGE & CHART */}
        <div
          className={`dashboard__top-section ${isLargeScreen ? 'row' : 'column'}`}
        >
          {/* Left: Vibe Score */}
          <Card className="dashboard__gauge-card">
            <Gauge score={teamData.vibeScore} />
          </Card>

          {/* Right: Score History */}
          <Card
            className={`dashboard__chart ${
              isLargeScreen ? 'dashboard__chart--large' : ''
            }`}
          >
            <div className="dashboard__chart-header">
              <h2>Score history</h2>
              <span>Last 9 months</span>
            </div>
            <div className="dashboard__chart-graph">
              <div className="dashboard__chart-graph-line"></div>
              <div
                className="dashboard__chart-graph-point"
                style={{ left: '10%', top: '60%' }}
              ></div>
              <div
                className="dashboard__chart-graph-point"
                style={{ left: '30%', top: '40%' }}
              ></div>
              <div
                className="dashboard__chart-graph-point"
                style={{ left: '50%', top: '70%' }}
              ></div>
              <div
                className="dashboard__chart-graph-point"
                style={{ left: '70%', top: '30%' }}
              ></div>
              <div
                className="dashboard__chart-graph-point"
                style={{ left: '90%', top: '50%' }}
              ></div>
            </div>
          </Card>
        </div>

        {/* MIDDLE SECTION: KPIS */}
        <div className="dashboard__kpis">
          <div className="dashboard__kpis-item">
            <span className="dashboard__kpis-item-emoji">☹️</span>
            <p className="dashboard__kpis-item-text">Your overall team Vibe is</p>
            <p className="dashboard__kpis-item-text bold">{teamData.overallVibe}</p>
          </div>

          <div className="dashboard__kpis-item">
            <div className="dashboard__kpis-item-circle yellow">
              <span>{teamData.participation}%</span>
            </div>
            <span className="dashboard__kpis-item-label">Participation</span>
          </div>

          <div className="dashboard__kpis-item">
            <div className="dashboard__kpis-item-circle blue">
              <span>{teamData.monthlyActiveUsers}%</span>
            </div>
            <span className="dashboard__kpis-item-label">Monthly active users</span>
          </div>

          <div className="dashboard__kpis-item">
            <div className="dashboard__kpis-item-icon">
              <span>👥</span>
            </div>
            <span className="dashboard__kpis-item-link">View team details</span>
          </div>
        </div>

        {/* BOTTOM SECTION: METRICS */}
        <h2 className="dashboard__metrics-title">Key performance metrics</h2>
        <div className="dashboard__metrics-grid">
          {teamData.kpiData.map((kpi) => (
            <div
              key={kpi.label}
              className={`dashboard__metrics-grid-item ${
                isLargeScreen ? 'large' : 'full'
              }`}
            >
              <ProgressBar label={kpi.label} value={kpi.value} color={kpi.color} />
            </div>
          ))}
        </div>
      </div>

      <TakeActionModal
        visible={showTakeActionModal}
        onClose={() => setShowTakeActionModal(false)}
      />
    </div>
  );
};

export default Dashboard;

