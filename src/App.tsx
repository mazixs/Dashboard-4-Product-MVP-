import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart, Bar } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { mockUsers, mockEvents, mockConversionRate } from './mockData';

interface User {
  user_id: number;
  registration_date: string;
  traffic_source: string;
}

interface Event {
  event_id: number;
  user_id: number;
  event_type: string;
  event_time: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [conversionRate, setConversionRate] = useState<number>(0);
  const [funnelData, setFunnelData] = useState<{ name: string; value: number }[]>([]);
  const [trafficSourceData, setTrafficSourceData] = useState<{ name: string; value: number }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setUsers(mockUsers);
      setEvents(mockEvents);
      setConversionRate(mockConversionRate);

      // Calculate funnel data
      const viewCount = mockEvents.filter(event => event.event_type === 'view').length;
      const clickCount = mockEvents.filter(event => event.event_type === 'click').length;
      const purchaseCount = mockEvents.filter(event => event.event_type === 'purchase').length;

      setFunnelData([
        { name: 'View', value: viewCount },
        { name: 'Click', value: clickCount },
        { name: 'Purchase', value: purchaseCount }
      ]);

      // Calculate traffic source data
      const trafficSources = mockUsers.reduce((acc: {[key: string]: number}, user: User) => {
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
    return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;
  }

  return (
    <div className="App" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>User Behavior Analytics Dashboard</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        <div style={{ width: '100%', maxWidth: '600px', margin: '20px' }}>
          <h2>Conversion Rate</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={[{ name: 'Conversion Rate', value: conversionRate }]}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{ width: '100%', maxWidth: '600px', margin: '20px' }}>
          <h2>Sales Funnel</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={funnelData}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ width: '100%', maxWidth: '600px', margin: '20px' }}>
          <h2>Traffic Sources</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={trafficSourceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {trafficSourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        <div style={{ width: '100%', maxWidth: '600px', margin: '20px' }}>
          <h2>Users</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                  <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>User ID</th>
                  <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Registration Date</th>
                  <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Traffic Source</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.user_id}>
                    <td style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>{user.user_id}</td>
                    <td style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>{user.registration_date}</td>
                    <td style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>{user.traffic_source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: '600px', margin: '20px' }}>
          <h2>Events</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                  <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Event ID</th>
                  <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>User ID</th>
                  <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Event Type</th>
                  <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Event Time</th>
                </tr>
              </thead>
              <tbody>
                {events.map(event => (
                  <tr key={event.event_id}>
                    <td style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>{event.event_id}</td>
                    <td style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>{event.user_id}</td>
                    <td style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>{event.event_type}</td>
                    <td style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>{event.event_time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

