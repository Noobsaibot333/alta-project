// components/ChartSection.tsx
import React from 'react';
import { Select, Typography } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const { Option } = Select;

const data = [
  { name: '01', value: 2000 },
  { name: '13', value: 3200 },
  { name: '19', value: 4221 },
  { name: '31', value: 2700 },
];

const ChartSection: React.FC = () => {
  return (
    <div style={{ padding: '16px', width:'100%', backgroundColor: '#fff', borderRadius: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <div>
          <Typography.Title level={5} style={{ margin: 0 }}>Bảng thống kê theo ngày</Typography.Title>
          <Typography.Text type="secondary">Tháng 11/2021</Typography.Text>
        </div>
        <Select defaultValue="Ngày" style={{ width: 120 }}>
          <Option value="Ngày">Ngày</Option>
          <Option value="Tuần">Tuần</Option>
          <Option value="Tháng">Tháng</Option>
        </Select>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4A90E2" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#4A90E2" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', backgroundColor: '#4A90E2', color: '#fff' }}
            formatter={(value: number) => value.toLocaleString()} 
          />
          <Area type="monotone" dataKey="value" stroke="#4A90E2" fillOpacity={1} fill="url(#colorUv)" />
          <Line type="monotone" dataKey="value" stroke="#4A90E2" dot={{ stroke: '#4A90E2', strokeWidth: 2, r: 5 }} activeDot={{ r: 8 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartSection;
