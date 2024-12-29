import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart, Bar } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import Card from './Card';
import DataTable from './DataTable';

// Update colors to match the image exactly
const COLORS = ['#0088FF', '#00D5B0', '#FFB020', '#FF6B6B'];

interface DashboardProps {
  conversionRate: number;
  funnelData: Array<{ name: string; value: number }>;
  trafficSourceData: Array<{ name: string; value: number }>;
  users: Array<any>;
  events: Array<any>;
}

const Dashboard: React.FC<DashboardProps> = ({
  conversionRate,
  funnelData,
  trafficSourceData,
  users,
  events
}) => {
  const [activeSection, setActiveSection] = useState('overview');

  // Custom label component for the pie chart
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 1.1;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#666"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-sm"
      >
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <button
          className={`nav-button ${activeSection === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveSection('overview')}
        >
          Overview
        </button>
        <button
          className={`nav-button ${activeSection === 'userdata' ? 'active' : ''}`}
          onClick={() => setActiveSection('userdata')}
        >
          User Data
        </button>
      </nav>

      {activeSection === 'overview' && (
        <section className="dashboard-overview">
          <h2 className="section-title">Overview</h2>
          <div className="dashboard-grid">
            <Card title="Conversion Rate">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={[{ name: 'Conversion Rate', value: conversionRate }]}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card title="Sales Funnel">
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
            </Card>

            <Card title="Traffic Sources">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={trafficSourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={renderCustomizedLabel}
                  >
                    {trafficSourceData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                        strokeWidth={0}
                      />
                    ))}
                  </Pie>
                  <Legend
                    align="right"
                    verticalAlign="middle"
                    layout="vertical"
                    iconType="circle"
                    iconSize={8}
                    formatter={(value) => (
                      <span style={{ color: '#666', fontSize: '14px' }}>{value}</span>
                    )}
                  />
                  <Tooltip 
                    formatter={(value, name) => [`${value} (${((value / trafficSourceData.reduce((a, b) => a + b.value, 0)) * 100).toFixed(0)}%)`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </section>
      )}

      {activeSection === 'userdata' && (
        <section className="dashboard-userdata">
          <h2 className="section-title">User Data</h2>
          <div className="dashboard-grid">
            <Card title="Users">
              <DataTable
                data={users}
                columns={[
                  { key: 'user_id', header: 'User ID' },
                  { key: 'registration_date', header: 'Registration Date' },
                  { key: 'traffic_source', header: 'Traffic Source' }
                ]}
              />
            </Card>

            <Card title="Events">
              <DataTable
                data={events}
                columns={[
                  { key: 'event_id', header: 'Event ID' },
                  { key: 'user_id', header: 'User ID' },
                  { key: 'event_type', header: 'Event Type' },
                  { key: 'event_time', header: 'Event Time' }
                ]}
              />
            </Card>
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;

