import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const [activeLink, setActiveLink] = useState('/dashboard');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:5000/api/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
      } catch (error) {
        console.error('Error fetching data', error);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  };

  const userName = localStorage.getItem('userName') || 'User';

  // Styles...

  return (
    <div style={dashboardStyle}>
      <div style={sidebarStyle}>
        <h2>Driver Monitoring</h2>
        <a href="/dashboard" style={activeLink === '/dashboard' ? navLinkActiveStyle : navLinkStyle} onClick={() => setActiveLink('/dashboard')}>Dashboard</a>
        <a href="/drivers" style={activeLink === '/drivers' ? navLinkActiveStyle : navLinkStyle} onClick={() => setActiveLink('/drivers')}>Driver Profiles</a>
        <a href="/analytics" style={activeLink === '/analytics' ? navLinkActiveStyle : navLinkStyle} onClick={() => setActiveLink('/analytics')}>Trip Analytics</a>
        <a href="/alerts" style={activeLink === '/alerts' ? navLinkActiveStyle : navLinkStyle} onClick={() => setActiveLink('/alerts')}>Safety Alerts</a>
        <a href="/settings" style={activeLink === '/settings' ? navLinkActiveStyle : navLinkStyle} onClick={() => setActiveLink('/settings')}>Settings</a>
        <button style={logoutButtonStyle} onClick={handleLogout}>Logout</button>
      </div>
      <div style={contentStyle}>
        <div style={headerStyle}>
          <div style={titleStyle}>Driver Behavior Monitoring Dashboard</div>
          <div style={userSectionStyle}>
            <span>Welcome, {userName}</span>
          </div>
        </div>
        <div style={cardStyle}>
          <h3>Overview</h3>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div style={overviewStyle}>
            <div style={metricStyle}>
              <h4>Total Trips</h4>
              <p>{loading ? 'Loading...' : data.totalTrips}</p>
            </div>
            <div style={metricStyle}>
              <h4>Safe Driving %</h4>
              <p>{loading ? 'Loading...' : `${data.safeDrivingPercentage}%`}</p>
            </div>
            <div style={metricStyle}>
              <h4>Average Score</h4>
              <p>{loading ? 'Loading...' : data.averageScore}</p>
            </div>
          </div>
        </div>
        <div style={cardStyle}>
          <h3>Driver Behavior Trends</h3>
          <div style={chartStyle}></div>
        </div>
        <div style={cardStyle}>
          <h3>Safety Alerts</h3>
          {data ? (
            data.alerts.map((alert, index) => (
              <p key={index}>{alert.message}</p>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
