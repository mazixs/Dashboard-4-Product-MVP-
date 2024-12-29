import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './ThemeContext';
import { Header } from './Header';
import Dashboard from './Dashboard';
import UTMGenerator from './UTMGenerator';
import { mockUsers, mockEvents, mockConversionRate } from './mockData';
import './App.css';

const App: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [conversionRate, setConversionRate] = useState(0);
  const [funnelData, setFunnelData] = useState([]);
  const [trafficSourceData, setTrafficSourceData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      setUsers(mockUsers);
      setEvents(mockEvents);
      setConversionRate(mockConversionRate);

      const viewCount = mockEvents.filter(event => event.event_type === 'view').length;
      const clickCount = mockEvents.filter(event => event.event_type === 'click').length;
      const purchaseCount = mockEvents.filter(event => event.event_type === 'purchase').length;

      setFunnelData([
        { name: 'View', value: viewCount },
        { name: 'Click', value: clickCount },
        { name: 'Purchase', value: purchaseCount }
      ]);

      const trafficSources = mockUsers.reduce((acc, user) => {
        acc[user.traffic_source] = (acc[user.traffic_source] || 0) + 1;
        return acc;
      }, {});

      setTrafficSourceData(Object.entries(trafficSources).map(([name, value]) => ({ name, value })));
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <ThemeProvider>
      <div className="App">
        <Header />
        <main className="main-content">
          <Dashboard
            conversionRate={conversionRate}
            funnelData={funnelData}
            trafficSourceData={trafficSourceData}
            users={users}
            events={events}
          />
          <UTMGenerator />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;

