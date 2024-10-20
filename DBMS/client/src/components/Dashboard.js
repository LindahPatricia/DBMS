import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, [token]);

  const dashboardStyle = {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#f0f8ff',
  };

  const sidebarStyle = {
    width: '250px',
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
  };

  const navLinkStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '10px 15px',
    margin: '5px 0',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  };

  const navLinkHoverStyle = {
    backgroundColor: '#45a049',
  };

  const headerStyle = {
    flex: '1',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
  };

  const userSectionStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const logoutButtonStyle = {
    marginLeft: '20px',
    padding: '10px 15px',
    backgroundColor: '#d9534f',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const contentStyle = {
    flex: '3',
    padding: '20px',
    overflowY: 'auto',
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    margin: '20px 0',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  };

  const overviewStyle = {
    display: 'flex',
    justifyContent: 'space-between',
  };

  const metricStyle = {
    flex: '1',
    margin: '0 10px',
    textAlign: 'center',
  };

  const chartStyle = {
    height: '200px',
    backgroundColor: '#e7f1ff',
    borderRadius: '8px',
    margin: '20px 0',
  };

  return (
    <div style={dashboardStyle}>
      <div style={sidebarStyle}>
        <h2>Driver Monitoring</h2>
        <a href="/dashboard" style={navLinkStyle}>Dashboard</a>
        <a href="/drivers" style={navLinkStyle}>Driver Profiles</a>
        <a href="/analytics" style={navLinkStyle}>Trip Analytics</a>
        <a href="/alerts" style={navLinkStyle}>Safety Alerts</a>
        <a href="/settings" style={navLinkStyle}>Settings</a>
        <button style={logoutButtonStyle} onClick={() => {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }}>Logout</button>
      </div>
      <div style={contentStyle}>
        <div style={headerStyle}>
          <div style={titleStyle}>Driver Behavior Monitoring Dashboard</div>
          <div style={userSectionStyle}>
            <span>Welcome, User</span>
          </div>
        </div>
        <div style={cardStyle}>
          <h3>Overview</h3>
          <div style={overviewStyle}>
            <div style={metricStyle}>
              <h4>Total Trips</h4>
              <p>{data ? data.totalTrips : 'Loading...'}</p>
            </div>
            <div style={metricStyle}>
              <h4>Safe Driving %</h4>
              <p>{data ? `${data.safeDrivingPercentage}%` : 'Loading...'}</p>
            </div>
            <div style={metricStyle}>
              <h4>Average Score</h4>
              <p>{data ? data.averageScore : 'Loading...'}</p>
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
